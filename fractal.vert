attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main(){
  // copying the texcoordinates
  pos = aTexCoord;
  // inverting as the gpu views coordinates differently
  pos.y = 1.0 - pos.y;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // position.xy/=1.5;
  // position.y += 1.0

  // position.y += sin(position.x * 8.)/8.;
  gl_Position = positionVec4;
}
