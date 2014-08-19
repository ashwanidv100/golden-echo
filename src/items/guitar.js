(function() {

  var root = this;
  var previousGuitar = root.Guitar || {};

  var resetCount = 0, vector = new THREE.Vector3();

  var Guitar = root.Guitar = function() {

    Item.call(this);

    this.position.set(Infinity, Infinity, Infinity);

  };

  Guitar.Offset = 300;

  var amt = 120;
  var radius = 20;
  var spread = 100;
  var phi = 3;

  var geometry = new THREE.TubeGeometry(new THREE.SplineCurve3(_.map(_.range(amt), function(i) {

    var pct = i / (amt - 1);
    var theta = pct * Math.PI * 2;

    var x = 0;
    var y = radius * Math.sin(theta * phi);
    var z = (pct - 0.5) * spread;

    return new THREE.Vector3(x, y, z);

  })), 200, 0.5, 32, false);

  Guitar.prototype = Object.create(Item.prototype);

  _.extend(Guitar.prototype, {

    Geometry: geometry,

    Material: new THREE.MeshBasicMaterial({
      color: 'brown'
    }),

    start: function(origin, direction) {

      Item.prototype.start.call(this, origin, direction);

      var s = this.t * 100;
      this.scale.set(s, s, s);

      return this;

    },

    reset: function() {

      this.stop();

      switch (resetCount) {

        case 0:
          this.offset.x = - (Guitar.Offset + Math.random() * Guitar.Offset / 2);
          break;
        case 1:
          this.offset.x = (Guitar.Offset + Math.random() * Guitar.Offset / 2);
          break;

      }

      // this.offset.y = (Math.random() * Guitar.Offset + Guitar.Offset) / 4;

      resetCount = (resetCount + 1) % 2;

      return this;

    }

  });

})();