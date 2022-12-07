Upgrade Box -> Box V2
Proxy -> Box
|
---> Box V2

1. Deploy a Proxy Contract
   Use Hardhat built in deploy proxies (Use OpenZeppelin transparent proxy as proxy Contract)
   Assign Proxy an AdminContract (here BoxProxyAdmin) which inherits ProxyAdmin contract by openzeppelin
   3 contracts get deployed . 1- BoxProxyAdmin(admin contract) 2 - Box_Implementation(Our original box contract) 3- Box_Proxy (Proxy contract)
   Now whenever we'll call Box_Proxy contract it will use storage and account of its own but the logic and functionality of Box_Implementation contract.(Beacuse it uses delegateCall() method)

   In UpgradeBox.js script we can see that we are using same contract(Proxy contract) but with different ABIs (new ABIs/contract need to be added by Admin contract).That results in differnet functionality using same contract.
