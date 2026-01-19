#ifdef GL_ES
precision highp float;
#endif

varying vec2 pos;

uniform float minx;
uniform float maxx;
uniform float miny;
uniform float maxy;

const float MAX_ITERATIONS = 500.0;
const vec4 startColour = vec4(0.3,0.0 ,0.9 ,1.0 );
const vec4 endColour = vec4(0.8,0.0 ,0.5 ,1.0 );

// returns in the range 0.0 to 1.0(normalized)
float iterateMandelbrot(vec2 coord) {
  float x = 0.0;
  float y = 0.0;
  for (float r = 0.0; r < MAX_ITERATIONS; r++) {
    if (x * x + y * y > 4.0) {
      return r / MAX_ITERATIONS;
    }
    float xtemp = x * x - y * y + coord.x;
    float ytemp = 2.0 * x * y + coord.y;
    x = xtemp;
    y = ytemp;
  }
  return 1.0;
}

void main(){
  float x = ((maxx - minx) * pos.x) + minx;
  float y = ((maxy - miny) * pos.y) + miny;
  
  float i = iterateMandelbrot(vec2(x,y));
  // colors
  gl_FragColor = vec4(i,i ,i ,1.0 );
  // gl_FragColor = mix(startColour,endColour ,i );
}
