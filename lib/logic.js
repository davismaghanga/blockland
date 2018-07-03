/**
* Sample transaction
* @param {com.neverest.co.ke.LandTransfer} landTransfer
* @transaction
*/


function landTransfer(landTransfer) {
    // this function can be used to precondition land transfer
    if (landTransfer.from.account.balance < landTransfer.land_value) {
    throw new Error ("Insufficient funds on purchaser account");
    }

    landTransfer.from.account.balance += landTransfer.land_value;
    landTransfer.to.account.balance -= landTransfer.amount;

    landTransfer.land.currentOwner = landTransfer.to

    return getAssetRegistry('com.neverest.co.ke.Land')
    .then (function (assetRegistry) {
        return assetRegistry.update(landTransfer.land);
    })
    .then (function () {
        return getAssetRegistry('com.neverest.co.ke.Account');
    })
    .then(function(assReg){
        return assReg.update(landTransfer.from.account);
    })
    .then (function () {
        return getAssetRegistry('com.neverest.co.ke.Account');
    })
    .then(function(assReg){
        return assReg.update(landTransfer.to.account);
    })

}