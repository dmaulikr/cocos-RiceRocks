cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        maxAsteroids: 15,
        spawnInterval: 3
    },

    _spawnAsteroid: function() {
        var self = this;
        if (self.asteroidPool.size() > 0) {
            var x = (Math.random() * 2 - 1) * self.node.width / 2;
            var y = (Math.random() * 2 - 1) * self.node.width / 2;
            var ast = self.asteroidPool.get(x, y, self.node);
            self.node.addChild(ast);
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        cc.loader.loadRes("prefab/asteroid", cc.Prefab, function (err, prefab) {
            self.pref_asteroid = prefab;
            self.asteroidPool = new cc.NodePool('asteroid');
            for (var i = 0; i < self.maxAsteroids; i++) {
                var ast = cc.instantiate(self.pref_asteroid); // 创建节点
                self.asteroidPool.put(ast); // 通过 putInPool 接口放入对象池
            }

            self.schedule(self._spawnAsteroid, self.spawnInterval);
        });

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
