# VPC 配置详细说明

`vpc.yml`整体参照了[AWS CloudFormation VPC template](https://docs.aws.amazon.com/codebuild/latest/userguide/cloudformation-vpc-template.html)

其具体说明如下

## CIDR 分析

总共定义了 5 个 CIDR 地址，第一个是整个 VPC(virtual private cloud)的地址。

```
VPC: 10.192.0.0/16
(2^16 = 65536个地址, 10.192.0.0->10.192.255.255)

Public 1:  10.192.10.0/24
(2^8 = 256个地址, 10.192.10.0->10.192.10.255)

Public 2:  10.192.11.0/24
(2^8 = 256个地址, 10.192.11.0->10.192.10.255)

Private 1: 10.192.20.0/24
(2^8 = 256个地址, 10.192.20.0->10.192.20.255)

Private 2: 10.192.21.0/24
(2^8 = 256个地址, 10.192.21.0->10.192.21.255)
```

## VPC 配置

```
    VPC:
        Type: AWS::EC2::VPC
        Properties:
            CidrBlock: !Ref VpcCIDR
            EnableDnsSupport: true
            EnableDnsHostnames: true
            Tags:
                - Key: Name
                  Value: !Ref EnvironmentName
```

// EnableDnsSupport 是什么
// EnableDnsHostname 又是什么

Tag 里的 Name 指定了 VPC 的名字

## Internet Gateway

```
    InternetGateway:
        Type: AWS::EC2::InternetGateway
        Properties:
            Tags:
                - Key: Name
                  Value: !Ref EnvironmentName

    InternetGatewayAttachment:
        Type: AWS::EC2::VPCGatewayAttachment
        Properties:
            InternetGatewayId: !Ref InternetGateway
            VpcId: !Ref VPC

```

// TODO Internet Gateway 是什么，有什么作用

InternetGateway 指定和 VPC 相同的名字。

InternetGatewayAttachment 指定 VPC 和 InterGateway 的绑定关系

// TODO 是否是一对一关系

## Public Net 的设置

```
    PublicSubnet1:
        Type: AWS::EC2::Subnet
        Properties:
            VpcId: !Ref VPC
            AvailabilityZone: !Select [0, !GetAZs ""]
            CidrBlock: !Ref PublicSubnet1CIDR
            MapPublicIpOnLaunch: true
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} Public Subnet (AZ1)
```

Public Net 两个的关系基本一样

```
    AvailabilityZone: !Select [0, !GetAZs ""]
```

通过 CloudFormation 提供的一些函数实现拿到当前的可用区信息， 直接指定可用区

```
    MapPublicIpOnLaunch: true
```

// TODO MapPublicIpOnLaunch 是啥，和 UI 的对应关系

## Private Net 的设置

```
    PrivateSubnet1:
        Type: AWS::EC2::Subnet
        Properties:
            VpcId: !Ref VPC
            AvailabilityZone: !Select [0, !GetAZs ""]
            CidrBlock: !Ref PrivateSubnet1CIDR
            MapPublicIpOnLaunch: false
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} Private Subnet (AZ1)
```

和 Public 的配置基本相同，唯一的区别在

```
    MapPublicIpOnLaunch: false
```

即在启动时不自动分配 public ip
// TODO 效果是什么，有没有 public ip 具体有什么影响
// 访问外网是否一定需要一个 public ip (我觉得应该是)

## 弹性 IP 资源

`vpc.yml`中一共定义了两个弹性 IP.

```
    NatGateway1EIP:
        Type: AWS::EC2::EIP
        DependsOn: InternetGatewayAttachment
        Properties:
            Domain: vpc
```

## NAT Gateway 资源

`vpc.yml`中一共定义了两个 NAT Gateway

```
    NatGateway1:
        Type: AWS::EC2::NatGateway
        Properties:
            AllocationId: !GetAtt NatGateway1EIP.AllocationId
            SubnetId: !Ref PublicSubnet1
```

在 NAT Gateway 资源定义里， `AllocationId`指定分配的弹性 ip 资源.
`SubnetId`指定 NatGateway 所在的子网。
因此, `NatGateway1` 资源指定了创建一个 NatGateway, 其所在的子网为`PublicSubnet1`,分配的弹性 IP 资源为`NatGateway1EIP`

## 路由设定

路由包含路由表和路由两个部分。一个路由表中有多个路由

### 公开网络路由配置

首先是公开网络的路由表

```
    PublicRouteTable:
        Type: AWS::EC2::RouteTable
        Properties:
            VpcId: !Ref VPC
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} Public Routes
```

路由表指定了所在的 VPC 和路由表的名字 `!Sub ${EnvironmentName} Public Routes`

公有路由表的默认路由配置

```
    DefaultPublicRoute:
        Type: AWS::EC2::Route
        DependsOn: InternetGatewayAttachment
        Properties:
            RouteTableId: !Ref PublicRouteTable
            DestinationCidrBlock: 0.0.0.0/0
            GatewayId: !Ref InternetGateway
```

路由规则指定为是`PublicRouteTable`里的规则， 并且依赖于`InternetGatewayAttachment`已经创建。
然后指定所有的出口流量`0.0.0.0/0`都应当导向 `InternetGateway`, 因此才能访问公有网络。

然后指定公开子网的路由表为`PublicRouteTable`

```
    PublicSubnet1RouteTableAssociation:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
            RouteTableId: !Ref PublicRouteTable
            SubnetId: !Ref PublicSubnet1
```

此条规则中将公开子网 1`PublicSubnet1`关联到公开路由表上。
公开子网 2 和公开子网 1 可以采用同样的路由规则，因此可以复用 PublicRouteTable.

// TODO 1 个子网是否能有多个路由表? 推测不能

### 私有网络路由配置

私有子网的流量需要通过两个不同 Nat Gateway 导到 InternetGateway，因此不能公用一张路由表。
需要采用两张路由表。

```
    PrivateRouteTable1:
        Type: AWS::EC2::RouteTable
        Properties:
            VpcId: !Ref VPC
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} Private Routes (AZ1)
```

首先创建一条路由规则所有的流量导向 NatGateway1

```
    DefaultPrivateRoute1:
        Type: AWS::EC2::Route
        Properties:
            RouteTableId: !Ref PrivateRouteTable1
            DestinationCidrBlock: 0.0.0.0/0
            NatGatewayId: !Ref NatGateway1
```

注意 NatGateway1 是在公开子网中的

然后指定私有网络 1`PrivateSubnet1`的路由表为`PrivateRouteTable1`

```
    PrivateSubnet1RouteTableAssociation:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
            RouteTableId: !Ref PrivateRouteTable1
            SubnetId: !Ref PrivateSubnet1
```

在此配置只有， `PrivateSubnet1`内的流量会通过`PrivateRouteTable1`到达公网中的`NatGateway1`,而
`NatGateway1`处于`PublicSubnet1`中，其出口流量会根据路由规则走到`InternetGateway`,因此能够访问到外部互联网。

第二个私有子网配置与此基本类似

## NoIngressSecurityGroup

```
    NoIngressSecurityGroup:
        Type: AWS::EC2::SecurityGroup
        Properties:
            GroupName: "no-ingress-sg"
            GroupDescription: "Security group with no ingress rule"
            VpcId: !Ref VPC
```

// TODO 这条规则干嘛的来着 ?

至此，整个 VPC 的配置完成

## Challenge

1. 只配置一个公开子网和一个私有子网
2. 修改资源文件导入 EIP 的地址
3. 直接在已有的 VPC 上创建对应的子网，而不是创建一个 VPC
