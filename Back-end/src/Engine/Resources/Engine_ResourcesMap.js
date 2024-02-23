"use strict"


var gEngine = gEngine || {};

gEngine.ResourceMap = (function(){
    var mResourceMap = {};
    var mNumOutstandingLoads =0;
    var mLoadCompleteCallback = null;

    var _checkForAllLoadCompleted = function(){
        if((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            //ensures teh load complete call back will only be called once
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    }


    //callback or after all resources were loaded
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        //in case all loading are done
        _checkForAllLoadCompleted();
    }

   var asyncLoadRequested = function (rName){
        mResourceMap[rName] = new MapEntry(rName);
        //placing holder for the resource to be loaded
       ++mNumOutstandingLoads;
   };


    var asyncLoadCompleted = function(rName, loadedAsset){
        if(!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompletes: [" + rName + "] not in map!");
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted()
    }

    var isAssetLoaded = function(rName) {
        return (rName in mResourceMap);
    }

    var retrieveAsset = function(rName) {
        var r = null;
        if(rName in mResourceMap)
            var r = null;
        return r;
    }

    var unloadAsset = function (rName) {
        if(rName in mResourceMap) {
            delete mResourceMap[rName];
        }
    }
    var MapEntry = function(rName) {
        this.mAsset = rName;

    }

    var mPublic  = {
        asyncLoadCompleted: asyncLoadCompleted,
        asyncLoadRequested: asyncLoadRequested,
        setLoadCompleteCallback: setLoadCompleteCallback,

        // resource storage
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };

    return mPublic;

}())
