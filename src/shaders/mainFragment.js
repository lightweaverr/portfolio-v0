const shader = /* glsl */  `

  uniform sampler2D uPreviousState;
  uniform vec2 uGridSize;

  varying vec2 vUv;

  void main() {

    vec4 value = texture2D(uPreviousState, vUv);
    float shade = 0.0;
    if (value.x < 0.1) shade = value.x;
    else shade = value.x > 0.5 ? 0.2 : 0.1;

    vec3 col = vec3(shade);

    gl_FragColor = vec4(col, 1.0);
  }
`
export default shader;