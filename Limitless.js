$(document).ready(() => {
  let $target = $("#UpsidedownObstacleimage");
  let $source = $("#obstacle1");

  // Move the source with mouse for example
  $(document).mousemove((event) => {
    // First move the source with mouse
    $source.css({ top: event.clientY, left: event.clientX });

    // Now see if the source and target have collided
    // The collision algorithm is in testCollision
    // If you have more than one target, just loop this..
    if (testCollision($source, $target) == true) {
      // I am just changing the targets color, but you could do anything here
      $target.removeClass("no-collision-state");
      $target.addClass("collision-state");
      //$target.removeClass("no-collision-state");
    } else {
      // removing color if not collided
      $target.removeClass("collision-state");
      $target.addClass("no-collision-state");
    }
  });
});

// Here is the collision algorithm
function testCollision(s, t) {
  // This tests to see if the two boxes overlap
  if (
    s.position().left < t.position().left + t.width() &&
    s.position().left + s.width() > t.position().left &&
    s.position().top < t.position().top + t.height() &&
    s.position().top + s.height() > t.position().top
  ) {
    // collision detected!
    console.log("collision!");
    return true;
  }

  // no collision
  console.log("no collision");
  return false;
}

