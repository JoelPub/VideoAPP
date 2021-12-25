<template>
  <svg
    @click="$emit('backHome')"
    :class="{'click-area': $route.path!='/register'}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="143.06"
    height="26.987"
    viewBox="0 0 143.06 26.987"
  >s
    <defs>
      <clipPath id="clip-path">
        <path
          id="SVGID"
          class="cls-1"
          d="M409.545,1201.691a5.1,5.1,0,0,1,4.643-2.5c3.342.07,5.259,4.467,10.395,4.239,2.849-.141,4.684-.715,5.224-1.126-.8.961-3.943,2.432-7.6,2.4-4.7-.045-6.221-4.406-8.773-4.678A4.586,4.586,0,0,0,409.545,1201.691Z"
          transform="translate(-409.545 -1199.192)"
        />
      </clipPath>
      <clipPath id="clip-path-2">
        <rect
          id="矩形_445"
          data-name="矩形 445"
          class="cls-1"
          width="21.896"
          height="7.147"
        />
      </clipPath>
      <pattern
        id="pattern"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 135 45"
      >
        <image
          width="135"
          height="45"
          xlink:href="data:image/png;base64,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"
        />
      </pattern>
      <clipPath id="clip-path-4">
        <path
          id="SVGID-2"
          data-name="SVGID"
          class="cls-1"
          d="M401.051,1173.711s-4.546.967-4.224,4.833c.2,2.3,4.152,4.4,8.484,1.36s5.477-6.909,11.026-7.3,4.9,4.045.716,5.692a12.7,12.7,0,0,1-7.759.83c1.055.391,3.315,1.157,8.2-.239,5.328-1.522,7.9-5.96,4.534-8.86s-10.524-1.9-15.142,3.4c-3.893,4.467-5.987,5.639-7.9,4.736C397,1177.222,399.046,1174.5,401.051,1173.711Z"
          transform="translate(-396.81 -1168.427)"
        />
      </clipPath>
      <clipPath id="clip-path-5">
        <rect
          id="矩形_448"
          data-name="矩形 448"
          class="cls-1"
          width="28.365"
          height="14.628"
        />
      </clipPath>
      <pattern
        id="pattern-2"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 175 91"
      >
        <image
          width="175"
          height="91"
          xlink:href="data:image/png;base64,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"
        />
      </pattern>
    </defs>
    <g id="组_15939" data-name="组 15939" transform="translate(-155.33 -17)">
      <line
        id="直线_50"
        data-name="直线 50"
        class="cls-2"
        y2="16.648"
        transform="translate(215.938 21.819)"
      />
      <g id="组_15987" data-name="组 15987" transform="translate(155.33 17)">
        <path
          id="路径_324"
          data-name="路径 324"
          class="cls-3"
          d="M805.62-227.3c-.807-.043-2.422-.109-4.034-.219a43.676,43.676,0,0,1-6.023-.854,30.84,30.84,0,0,1-5.943-1.818,14.205,14.205,0,0,1-3.486-2.042,5.685,5.685,0,0,1-1.629-2,3.372,3.372,0,0,1,.264-3.346,7,7,0,0,1,2.023-2.022,17.885,17.885,0,0,1,4.269-2.1,30.3,30.3,0,0,1,4.613-1.258c1.269-.238,2.545-.446,3.825-.616a51.325,51.325,0,0,1,7.482-.41q1.861.026,3.72.158c1.166.083,2.331.208,3.491.36a40.516,40.516,0,0,1,4.646.9,28.3,28.3,0,0,1,4.807,1.636,13.1,13.1,0,0,1,3.276,2.02,5.252,5.252,0,0,1,1.56,2.108,3.258,3.258,0,0,1-.161,2.684,6.071,6.071,0,0,1-1.782,2.049,16.136,16.136,0,0,1-4.289,2.286,33.17,33.17,0,0,1-5.074,1.439c-1.57.324-3.154.558-4.749.727A66.472,66.472,0,0,1,805.62-227.3Zm.8-15.984q-2.612-.009-5.211.239c-1.106.1-2.209.252-3.309.411a35.4,35.4,0,0,0-5.368,1.2,19.459,19.459,0,0,0-4.623,2,7.022,7.022,0,0,0-2.237,2.021,2.944,2.944,0,0,0-.2,3.2,5.753,5.753,0,0,0,1.808,1.932,15.574,15.574,0,0,0,3.789,1.926,32.958,32.958,0,0,0,6.292,1.607c1.178.187,2.362.343,3.549.457,1.229.118,2.464.191,3.7.241.959.04,1.921.037,2.881.014,1.164-.029,2.331-.065,3.491-.162,1.287-.108,2.571-.268,3.852-.442a35,35,0,0,0,4.987-1.064,21.661,21.661,0,0,0,4.618-1.841,8.663,8.663,0,0,0,2.429-1.883,3.465,3.465,0,0,0,.912-2.064,3.212,3.212,0,0,0-.781-2.216,8.017,8.017,0,0,0-2.41-1.959,23.281,23.281,0,0,0-6.007-2.258,40.806,40.806,0,0,0-6.062-1.03q-1.817-.169-3.641-.271C808.057-243.273,807.236-243.267,806.416-243.285Z"
          transform="translate(-784.179 243.99)"
        />
        <path
          id="路径_325"
          data-name="路径 325"
          class="cls-3"
          d="M852.949-190.563c-1.481-.055-2.753-.075-4.02-.158-1.149-.075-2.3-.2-3.44-.335a36.681,36.681,0,0,1-6.734-1.415,16.394,16.394,0,0,1-4.54-2.091,5.836,5.836,0,0,1-1.456-1.386,2.622,2.622,0,0,1,.018-3.272,6.576,6.576,0,0,1,2-1.72,20.823,20.823,0,0,1,5.957-2.272q1.49-.36,3-.618c1-.169,2-.293,3.009-.4s2.005-.2,3.01-.235c1.41-.051,2.822-.064,4.233-.057.936,0,1.873.054,2.808.116.864.057,1.727.132,2.585.244q1.756.229,3.5.529a29.754,29.754,0,0,1,3.86.955,19.93,19.93,0,0,1,3.282,1.322,8.734,8.734,0,0,1,2.346,1.676,3.287,3.287,0,0,1,.919,1.63,2.661,2.661,0,0,1-.577,2.187,7.1,7.1,0,0,1-2.239,1.835,21.721,21.721,0,0,1-5.3,2.015,35.4,35.4,0,0,1-4.211.835c-1.228.165-2.462.309-3.7.4C855.761-190.669,854.25-190.625,852.949-190.563Zm-.242-5.873c-.073-.321-.116-.618-.211-.9-.156-.458-.314-.5-.727-.264-.035.021-.072.039-.106.062a.287.287,0,0,0-.134.359,2.775,2.775,0,0,1-.076,1.807,2.062,2.062,0,0,1-1.263,1.327.789.789,0,0,1-1.113-.8,2.126,2.126,0,0,1,.631-1.463,3.6,3.6,0,0,1,1.339-.881c.061-.025.145-.088.149-.139a.435.435,0,0,0-.483-.48,3.1,3.1,0,0,0-1.408.5,3.809,3.809,0,0,0-1.51,1.91,3.088,3.088,0,0,1-.9,1.25c-.322.271-.317.305-.041.626.088.1.177.131.284.037.216-.188.43-.377.645-.566.032-.028.066-.055.113-.094.027.064.047.105.062.148a1.635,1.635,0,0,0,1.759,1.127,2.546,2.546,0,0,0,1.674-.837c.4-.419.735-.893,1.093-1.347a8.542,8.542,0,0,1,1.492-1.6,1.812,1.812,0,0,1,.525-.267c.185-.06.3.05.271.246a1.1,1.1,0,0,1-.129.377q-.432.753-.884,1.495c-.339.554-.692,1.1-1.035,1.651-.1.162-.076.2.114.2.3,0,.6-.006.9,0a.289.289,0,0,0,.285-.155c.329-.526.664-1.048,1-1.571.188-.294.38-.586.6-.922.015.112.025.173.032.234a1.013,1.013,0,0,0,1.026.932,2.19,2.19,0,0,0,1.148-.387c.04-.024.083-.046.147-.081a6.64,6.64,0,0,0,.007.906,1.3,1.3,0,0,0,1.565,1.118,2.256,2.256,0,0,0,.982-.444c.156-.116.3-.245.468-.38.015.077.027.127.035.179a.833.833,0,0,0,.65.72,1.393,1.393,0,0,0,.776-.063,3.253,3.253,0,0,0,1.265-.77c.48-.462.929-.956,1.385-1.442a.186.186,0,0,0,.012-.178c-.236-.317-.318-.32-.589-.042-.024.025-.047.052-.073.076-.467.425-.926.86-1.407,1.268a1.194,1.194,0,0,1-.52.228c-.258.053-.406-.129-.329-.38a1.521,1.521,0,0,1,.174-.362q1.682-2.653,3.369-5.3c.051-.081.095-.166.144-.254-.043-.021-.058-.034-.073-.034-.392,0-.785-.007-1.177,0a.22.22,0,0,0-.151.093q-.969,1.474-1.932,2.953a1.917,1.917,0,0,1-.132.157,1.044,1.044,0,0,0-.624-.8,1.628,1.628,0,0,0-.947-.1,2.955,2.955,0,0,0-1.4.694c-.417.341-.807.714-1.221,1.058a2.783,2.783,0,0,1-1.138.67.558.558,0,0,1-.572-.126.931.931,0,0,1-.2-.355,1.057,1.057,0,0,1,.448-1.049c0,.063,0,.118,0,.174a.579.579,0,0,0,.61.622.818.818,0,0,0,.77-.518.861.861,0,0,0-.088-.988,1,1,0,0,0-1.11-.265,2.1,2.1,0,0,0-1.017.748c-.035.045-.075.086-.136.156-.006-.113-.009-.177-.013-.241-.05-.763-.563-.971-1.2-.787a2.951,2.951,0,0,0-1.3.917C853.083-196.843,852.9-196.639,852.707-196.436Zm-1.664-5.328a.373.373,0,0,1,.067.012c.7.185,1.4.368,2.1.558a9.777,9.777,0,0,0,3.74.439,3.72,3.72,0,0,0,1.9-.748,1.743,1.743,0,0,0,.389-.484.365.365,0,0,0-.022-.431c-.112-.131-.263-.084-.41-.062-.734.107-1.467.249-2.205.3a15.512,15.512,0,0,1-3.259-.14c-1.215-.175-2.426-.38-3.641-.562a14.571,14.571,0,0,0-3.062-.173,5.749,5.749,0,0,0-2.824.847,2.669,2.669,0,0,0-1.345,1.935,1.515,1.515,0,0,0,1.745,1.795,3.191,3.191,0,0,0,2.4-2.179.264.264,0,0,0-.116-.363c-.158-.074-.225.064-.3.167A2.584,2.584,0,0,1,844.8-199.8c-.654.181-1.09-.218-.958-.88a1.663,1.663,0,0,1,.785-1.057,4.562,4.562,0,0,1,2.652-.647,14.026,14.026,0,0,1,2.451.309c.2.038.405.082.648.132a1.247,1.247,0,0,1-.13.093,6.151,6.151,0,0,0-1.792,1.421c-.382.417-.7.89-1.057,1.333a.448.448,0,0,1-.214.158c-.209.052-.425.075-.638.113a3.632,3.632,0,0,0-1.478.565.3.3,0,0,0-.12.408c.09.134.243.141.417.028a3.554,3.554,0,0,1,.391-.235,1.916,1.916,0,0,1,.93-.2.337.337,0,0,1-.023.069,16.291,16.291,0,0,1-2.393,2.795,3.086,3.086,0,0,1-1.856.87,1.229,1.229,0,0,1-1.258-.653,1.271,1.271,0,0,1,.176-1.383,2.556,2.556,0,0,1,.9-.74.266.266,0,0,0,.172-.308.294.294,0,0,0-.285-.264,1.45,1.45,0,0,0-.467.038,2.663,2.663,0,0,0-1.867,2.868,2.1,2.1,0,0,0,1.584,1.875,3.373,3.373,0,0,0,3.048-.622,8.1,8.1,0,0,0,1.887-2.04c.57-.843,1.1-1.713,1.655-2.566a.391.391,0,0,1,.237-.171c.61-.069,1.223-.124,1.835-.172a.4.4,0,0,1,.225.088c.187.128.36.278.551.4a.218.218,0,0,0,.315-.1c.078-.124,0-.189-.1-.254s-.2-.157-.327-.254a1.221,1.221,0,0,0,.881-.862.659.659,0,0,0-.2-.732.678.678,0,0,0-.777-.048,1.145,1.145,0,0,0-.605,1.1c.015.138-.023.178-.153.178s-.269.017-.4.024l-.984.046c.044-.079.073-.135.106-.187a8.546,8.546,0,0,1,2.208-2.211A2.4,2.4,0,0,0,851.043-201.763Z"
          transform="translate(-830.506 205.911)"
        />
        <path
          id="路径_326"
          data-name="路径 326"
          class="cls-3"
          d="M1604.123,12.319a3.677,3.677,0,0,1-1.3,1.546,1.51,1.51,0,0,1-.582.211.432.432,0,0,1-.5-.457,2.092,2.092,0,0,1,.33-1.215,3.237,3.237,0,0,1,1.175-1.226.908.908,0,0,1,.159-.072.576.576,0,0,1,.639.088.547.547,0,0,1,.084.589,2.194,2.194,0,0,1-.089.246C1603.98,12.188,1603.979,12.188,1604.123,12.319Z"
          transform="translate(-1572.982 -2.078)"
        />
        <path
          id="路径_327"
          data-name="路径 327"
          class="cls-3"
          d="M1353.01-76.879a.654.654,0,0,1,.26-.7.291.291,0,0,1,.249-.032c.048.024.074.15.065.224A.676.676,0,0,1,1353.01-76.879Z"
          transform="translate(-1332.984 83.481)"
        />
        <g
          id="组_15985"
          data-name="组 15985"
          transform="translate(5.814 21.411)"
        >
          <path
            id="路径_328"
            data-name="路径 328"
            class="cls-3"
            d="M952.935,365.384v.733h.534v-.429a.189.189,0,0,0-.064-.116c-.042-.044-.064-.077-.064-.1s.02-.054.061-.079h.956v.72h.517v.8h-.529v.778H955v.819h-.665v1.263h-.872V368.5h-.595a2.239,2.239,0,0,1-.8,1.367v.014h2.149a8.772,8.772,0,0,0,.932-.069,2.964,2.964,0,0,0-.309.932h-2.99a1.124,1.124,0,0,1-.6-.186,1.322,1.322,0,0,1-.464-.5,4.51,4.51,0,0,0-.669.808,2.1,2.1,0,0,0-.663-.732,4.178,4.178,0,0,0,.888-.81V368.05h-.764v-.863h1.648v2.089a.862.862,0,0,0,.228.4.494.494,0,0,0,.384.19,1.915,1.915,0,0,0-.505-.619,1.294,1.294,0,0,0,.624-.753h-.557v-.817h.641V366.9h-.522V366.1h.534v-.447c0-.035-.024-.068-.07-.1s-.071-.061-.071-.085a.094.094,0,0,1,.011-.046l.07-.043Zm-3.3.458.606-.521a4.86,4.86,0,0,1,.967.983,3.116,3.116,0,0,0-.742.571A4.594,4.594,0,0,0,949.635,365.842Zm3.828,1.843v-.765h-.54v.765Z"
            transform="translate(-949.447 -365.297)"
          />
          <path
            id="路径_329"
            data-name="路径 329"
            class="cls-3"
            d="M1210.144,371.391h-.191a4.614,4.614,0,0,1-2.092,2.829,2.146,2.146,0,0,0-.7-.7,3.451,3.451,0,0,0,1.853-2.125h-1.775v-.777h1.988a5.009,5.009,0,0,0,.1-1h-1.548v-.777h4.371v.777h-1.921a7.8,7.8,0,0,1-.112,1h2.586v.777h-1.691v1.8c0,.094.049.142.149.142h.491a.23.23,0,0,0,.217-.165,2.853,2.853,0,0,0,.081-.837,2.01,2.01,0,0,0,.836.231q-.074,1.579-.681,1.58h-1.4a.529.529,0,0,1-.4-.169.632.632,0,0,1-.164-.459Z"
            transform="translate(-1198.1 -368.692)"
          />
          <path
            id="路径_330"
            data-name="路径 330"
            class="cls-3"
            d="M1469,368.993h1.666v.807H1469v2.01h2.118v.808h-5.495v-.808h.763v-3.233a.093.093,0,0,0-.052-.076c-.035-.023-.052-.047-.052-.073,0-.055.05-.081.15-.081h.8v3.463h.932v-4.3a.1.1,0,0,0-.048-.08.1.1,0,0,1-.047-.072c0-.048.028-.072.083-.072H1469Z"
            transform="translate(-1447.464 -367.196)"
          />
          <path
            id="路径_331"
            data-name="路径 331"
            class="cls-3"
            d="M1721.036,366.837v-.089h-.218v1.327l.522-.149v.737l-1.6.609-.256-.819.577-.169v-1.537h-.489v-.772h.489v-1.022a.1.1,0,0,0-.064-.091.1.1,0,0,1-.066-.092c0-.049.054-.073.165-.073h.719v1.278h.456v.147h.682l-.155-.368h-.6v-.628h1.406a1.171,1.171,0,0,0-.1-.179c-.047-.073-.078-.123-.092-.153l.784-.159.215.491h1.436v.628h-.546l-.142.368h.888v.714Zm1.994,2h-.284a1.275,1.275,0,0,1-.14.636,1.339,1.339,0,0,1-.652.468,3.412,3.412,0,0,1-.98.269,2.6,2.6,0,0,0-.365-.713q1.3-.17,1.347-.659h-.51v-1.891h3.2v1.891h-.083v.006a1.929,1.929,0,0,0,.616.221,1.732,1.732,0,0,1-.23.777.634.634,0,0,1-.57.273h-.722a.954.954,0,0,1-.266-.048.52.52,0,0,1-.258-.171.4.4,0,0,1-.1-.258Zm-.831-1.215h1.661v-.106H1722.2Zm0,.617h1.661v-.1H1722.2Zm1.31-2.481h-.894l.136.368h.6Zm.3,3.079v.41a.118.118,0,0,0,.023.063.08.08,0,0,0,.072.034h.3c.036,0,.073-.047.117-.143a1.158,1.158,0,0,0,.089-.364Z"
            transform="translate(-1692.399 -364.636)"
          />
        </g>
      </g>
      <g
        id="组_15964"
        data-name="组 15964"
        transform="translate(229.709 24.01)"
      >
        <path
          id="路径_300"
          data-name="路径 300"
          class="cls-4"
          d="M632.3,1175.8h-2.25a1.486,1.486,0,0,0-1.565,1.388v2.6a1.482,1.482,0,0,0,1.565,1.376h2.25a1.49,1.49,0,0,0,1.579-1.376v-2.6A1.494,1.494,0,0,0,632.3,1175.8Zm-2.676,1.388a.4.4,0,0,1,.426-.368h2.25a.409.409,0,0,1,.439.368v2.6a.4.4,0,0,1-.439.356h-2.25a.387.387,0,0,1-.426-.356Z"
          transform="translate(-590.62 -1174.592)"
        />
        <g
          id="组_15945"
          data-name="组 15945"
          transform="translate(31.564 7.007)"
        >
          <path
            id="路径_301"
            data-name="路径 301"
            class="cls-4"
            d="M599.275,1211.3h-7.786a1.473,1.473,0,0,0-1.552,1.376v2.254a1.473,1.473,0,0,0,1.552,1.376h7.786a1.473,1.473,0,0,0,1.552-1.376v-2.254A1.473,1.473,0,0,0,599.275,1211.3Zm-8.2,3h8.61v.629a.383.383,0,0,1-.412.356h-7.786a.383.383,0,0,1-.412-.356Zm.412-1.981h7.786a.383.383,0,0,1,.412.356v.606h-8.61v-.606A.383.383,0,0,1,591.489,1212.32Z"
            transform="translate(-589.937 -1211.301)"
          />
        </g>
        <path
          id="路径_302"
          data-name="路径 302"
          class="cls-4"
          d="M586.434,1172.018c0,.03,0,.06,0,.09a1.853,1.853,0,0,1-.737,1.479v1.139a2.852,2.852,0,0,0,1.729-2.619c0-.03,0-.06,0-.09Z"
          transform="translate(-554.828 -1171.431)"
        />
        <path
          id="路径_303"
          data-name="路径 303"
          class="cls-4"
          d="M607.254,1195.053a4.273,4.273,0,0,1-3.723-2.2l.851-.5a3.3,3.3,0,0,0,2.863,1.712Z"
          transform="translate(-569.745 -1188.444)"
        />
        <path
          id="路径_304"
          data-name="路径 304"
          class="cls-4"
          d="M585.7,1195.053a4.272,4.272,0,0,0,3.723-2.2l-.851-.5a3.3,3.3,0,0,1-2.863,1.712Z"
          transform="translate(-554.828 -1188.444)"
        />
        <rect
          id="矩形_440"
          data-name="矩形 440"
          class="cls-4"
          width="6.635"
          height="1.016"
          transform="translate(30.869 3.518)"
        />
        <path
          id="路径_305"
          data-name="路径 305"
          class="cls-4"
          d="M743.367,1178.62a2.016,2.016,0,0,1-1.016-.215,1.2,1.2,0,0,1-.487-.581l-.793-1.767h1.182l.473,1.174a.713.713,0,0,0,.709.479h.626v.909Z"
          transform="translate(-684.806 -1174.811)"
        />
        <path
          id="路径_306"
          data-name="路径 306"
          class="cls-4"
          d="M747.028,1204.215a2.967,2.967,0,0,1-.891-.126,2.084,2.084,0,0,1-.654-.328l-.812-.656a1.425,1.425,0,0,1-.552.808,1.754,1.754,0,0,1-1.044.278h-.96v-1.027h.737c.4,0,.682-.227.682-.543v-4.558a.5.5,0,0,0-.5-.5h-.9v-.883h1.44a1.115,1.115,0,0,1,1.115,1.115v3.971l1.3,1.111a1.582,1.582,0,0,0,1.016.315h7.36l0,1.027Z"
          transform="translate(-685.68 -1192.059)"
        />
        <g
          id="组_15947"
          data-name="组 15947"
          transform="translate(43.696 1.22)"
        >
          <g id="组_15946" data-name="组 15946" transform="translate(0 0)">
            <path
              id="路径_307"
              data-name="路径 307"
              class="cls-4"
              d="M667.487,1182.124a1.128,1.128,0,0,0,1.194,1.456h5.006l.138-1.054h-4.816a.181.181,0,0,1-.144-.065.216.216,0,0,1-.036-.185l1.049-5.369h7.369v-1.017H666.569v1.017H668.5Z"
              transform="translate(-666.176 -1175.889)"
            />
            <path
              id="路径_308"
              data-name="路径 308"
              class="cls-4"
              d="M673.342,1200.72l.555-5.349a1.314,1.314,0,0,0-.362-1.1,1.5,1.5,0,0,0-1.056-.39h-4.13l-.184,1.03h4a.336.336,0,0,1,.26.11.382.382,0,0,1,.089.3l-.543,5.4h-7.806v1.017h11.606v-1.017Z"
              transform="translate(-664.166 -1190.945)"
            />
          </g>
          <path
            id="路径_309"
            data-name="路径 309"
            class="cls-4"
            d="M724.372,1216.5l-.138,1.054h1.539l.138-1.054Z"
            transform="translate(-714.417 -1209.859)"
          />
        </g>
        <path
          id="路径_310"
          data-name="路径 310"
          class="cls-4"
          d="M769.732,1178.437l-1.316-.7h-1.9l2.342,1.242h1.893l2.26-1.1a.82.82,0,0,0,.377-.518.424.424,0,0,0,0-.066.8.8,0,0,0-.794-.794l-6.962-.013v.845h6.395Z"
          transform="translate(-705.354 -1175.17)"
        />
        <path
          id="路径_311"
          data-name="路径 311"
          class="cls-4"
          d="M772.971,1192.095a1.4,1.4,0,0,0-.929-.362H766.6a1.325,1.325,0,0,0-1.265,1.262v4.717l1.14.958v-2.261h2.343v2.286h1.14v-2.286h2.285v1.059a.3.3,0,0,1-.289.256h-.576v.971h.686a1.427,1.427,0,0,0,.928-.337,1.008,1.008,0,0,0,.391-.742v-4.708A1.116,1.116,0,0,0,772.971,1192.095Zm-4.148,3.394h-2.343v-.883h2.344Zm0-1.817h-2.343v-.7c0-.141.236-.306.357-.306h1.986Zm3.424,1.817h-2.285v-.883h2.285Zm0-1.817h-2.285v-1.007h1.955c.12,0,.33.163.33.281Z"
          transform="translate(-705.108 -1187.924)"
        />
        <rect
          id="矩形_441"
          data-name="矩形 441"
          class="cls-4"
          width="5.763"
          height="1.016"
          transform="translate(31.564 1.608)"
        />
        <rect
          id="矩形_442"
          data-name="矩形 442"
          class="cls-4"
          width="1.197"
          height="1.299"
          transform="translate(33.646 2.382)"
        />
        <g
          id="组_15955"
          data-name="组 15955"
          transform="translate(2.081 5.028)"
        >
          <g id="组_15954" data-name="组 15954" transform="translate(0 0)">
            <g id="组_15953" data-name="组 15953" class="cls-5">
              <g
                id="组_15952"
                data-name="组 15952"
                transform="translate(-0.817 -0.817)"
              >
                <g id="组_15951" data-name="组 15951">
                  <g id="组_15950" data-name="组 15950" class="cls-6">
                    <g id="组_15949" data-name="组 15949">
                      <g id="组_15948" data-name="组 15948" class="cls-6">
                        <rect
                          id="矩形_443"
                          data-name="矩形 443"
                          class="cls-7"
                          width="21.966"
                          height="7.217"
                          transform="translate(-0.055 -0.048)"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="组_15963" data-name="组 15963">
          <g id="组_15962" data-name="组 15962" transform="translate(0 0)">
            <g id="组_15961" data-name="组 15961" class="cls-8">
              <g
                id="组_15960"
                data-name="组 15960"
                transform="translate(-0.817 -0.817)"
              >
                <g id="组_15959" data-name="组 15959">
                  <g id="组_15958" data-name="组 15958" class="cls-9">
                    <g id="组_15957" data-name="组 15957">
                      <g id="组_15956" data-name="组 15956" class="cls-9">
                        <rect
                          id="矩形_446"
                          data-name="矩形 446"
                          class="cls-10"
                          width="28.399"
                          height="14.67"
                          transform="translate(-0.014 -0.041)"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<style lang="less" scoped>
.cls-1,
.cls-2 {
  fill: none;
}

.cls-2 {
  stroke: #005596;
}

.cls-3 {
  fill: #003478;
}

.cls-4 {
  fill: #0064b6;
}

.cls-5 {
  clip-path: url(#clip-path);
}

.cls-6 {
  clip-path: url(#clip-path-2);
}

.cls-7 {
  fill: url(#pattern);
}

.cls-8 {
  clip-path: url(#clip-path-4);
}

.cls-9 {
  clip-path: url(#clip-path-5);
}

.cls-10 {
  fill: url(#pattern-2);
}
</style>
