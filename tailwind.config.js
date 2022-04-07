
let colors = {
  'transparent': 'transparent',

  'black': '#22292f',
  'grey-darkest': '#3d4852',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  'grey': '#b8c2cc',
  'grey-light': '#dae1e7',
  'grey-lighter': '#f1f5f8',
  'grey-lightest': '#f8fafc',
  'grey-cyan':'#abb8c3',
  'white': '#ffffff',

  'red-darkest': '#3b0d0c',
  'red-darker': '#621b18',
  'red-dark': '#cc1f1a',
  'red': '#e3342f',
  'red-light': '#ef5753',
  'red-lighter': '#f9acaa',
  'red-lightest': '#fcebea',

  'orange-darkest': '#462a16',
  'orange-darker': '#613b1f',
  'orange-dark': '#de751f',
  'orange': '#f6993f',
  'orange-light': '#faad63',
  'orange-lighter': '#fcd9b6',
  'orange-lightest': '#fff5eb',

  'yellow-darkest': '#453411',
  'yellow-darker': '#684f1d',
  'yellow-dark': '#f2d024',
  'yellow': '#ffed4a',
  'yellow-light': '#fff382',
  'yellow-lighter': '#fff9c2',
  'yellow-lightest': '#fcfbeb',

  'green-darkest': '#0f2f21',
  'green-darker': '#1a4731',
  'green-dark': '#1f9d55',
  'green': '#38c172',
  'green-light': '#51d88a',
  'green-lighter': '#a2f5bf',
  'green-lightest': '#e3fcec',

  'teal-darkest': '#0d3331',
  'teal-darker': '#20504f',
  'teal-dark': '#38a89d',
  'teal': '#4dc0b5',
  'teal-light': '#64d5ca',
  'teal-lighter': '#a0f0ed',
  'teal-lightest': '#e8fffe',

  'blue-darkest': '#12283a',
  'blue-darker': '#1c3d5a',
  'blue-dark': '#2779bd',
  'blue': '#3490dc',
  'blue-light': '#6cb2eb',
  'blue-lighter': '#bcdefa',
  'blue-lightest': '#eff8ff',

  'indigo-darkest': '#191e38',
  'indigo-darker': '#2f365f',
  'indigo-dark': '#5661b3',
  'indigo': '#6574cd',
  'indigo-light': '#7886d7',
  'indigo-lighter': '#b2b7ff',
  'indigo-lightest': '#e6e8ff',

  'purple-darkest': '#21183c',
  'purple-darker': '#382b5f',
  'purple-dark': '#794acf',
  'purple': '#9561e2',
  'purple-light': '#a779e9',
  'purple-lighter': '#d6bbfc',
  'purple-lightest': '#f3ebff',

  'pink-darkest': '#451225',
  'pink-darker': '#6f213f',
  'pink-dark': '#eb5286',
  'pink': '#f66d9b',
  'pink-light': '#fa7ea8',
  'pink-lighter': '#ffbbca',
  'pink-lightest': '#ffebef',
  'third': '#006600',
  'primary': '#00afee',
  'primary-purple': '#262162',
  'primary-red': '#EA1C23',
  'primary-yellow':'#F6ED31',
  'primary-dark':'#649A00',
  'purple':'#800080',
  'modal':'#5757585A',
  'grey-bg':'#fafafa',
  'grey-skeleton':'#d1d1d1',
  'loader':'rgba(124,124,127,0.2)',
  'grey-input':'#dde9d4',
  'dashboard-grey':'#eeeeee'
}

const measurements={
  'auto': 'auto',
  '0': '0px',
  '1/2': '50%',
  '1/3': '33.33333%',
  '2/3': '66.66667%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.66667%',
  '5/6': '83.33333%',
  '9/10': '90%',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '28px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '18': '72px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '48': '192px',
  '64': '256px',
  '80':'320px',
  'full': '100%',
  'screen-w': '100vw',
  'fit' :'fit-content',
  'min' :'min-content',
  'max' :'max-content',
  'unset' :'unset',
  'initial' :'initial',

  'screen-h': '100vh',
  'screen-h-90': '90vh',
  'screen-h-80': '80vh',
  'screen-h-70': '70vh',
  'screen-h-50': '50vh',
  'inherit':'inherit'

}

function Px(){
  let i
  for (i = 0; i <= 500; i++) {
    measurements[`${i}px`]=`${i}px`
  }
  for (i = 500; i < 1500; i+=100) {
    measurements[`${i}px`]=`${i}px`
  }
}
Px()
function Percent(){
  for (let i = 0; i < 100; i++) {
    measurements[`${i}%`]=`${i}%`
  }
}
Percent()

module.exports = {

  colors: colors,

  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1220px',
  },
  fonts: {
    'sans': [
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    'serif': [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    'mono': [
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ]
  },


  textSizes: measurements,

  fontWeights: {
    'hairline': 100,
    'thin': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900,
  },
  listStyle: {
    none: 'none',
    disc: 'disc',
    decimal: 'decimal',
    square: 'square',
    roman: 'upper-roman',
  },


  leading: {
    'none': 1,
    'tight': 1.25,
    'normal': 1.5,
    'loose': 2,
  },

  tracking: {
    'tight': '-0.05em',
    'normal': '0',
    'wide': '0.05em',
  },

  textColors: colors,

  backgroundColors: colors,

  backgroundSize: {
    'auto': 'auto',
    'cover': 'cover',
    'contain': 'contain',
  },


  borderWidths: measurements,



  borderColors: global.Object.assign({ default: colors['grey-light'] }, colors),


  borderRadius: {
    'none': '0',
    default: '.25rem',
    'full':'50%',
    'sm':'4px',
    'md':'8px',
    'lg':'16px',
    'pill':'9999px'
  },

  width: measurements,

  height: measurements,

  minWidth: measurements,

  minHeight: measurements,

  maxWidth: measurements,

  maxHeight:measurements,

  padding: measurements,

  margin: measurements,

  negativeMargin: measurements,
  left:measurements,
  right:measurements,
  top:measurements,
  bottom:measurements,

  shadows: {
    default: '0 2px 4px 0 rgba(0,0,0,0.10)',
    'md': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
    'lg': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
    'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    'outline': '0 0 0 3px rgba(52,144,220,0.5)',
    'none': 'none',
  },


  zIndex: {
    'auto': 'auto',
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    'n8':8,
    'n1':-1,
    'n2':-2,
    'n3':-3,
    'n4':-4,
    'n5':-5,
    'n6':-6,
    'n7':-7,
    'n8':-8,
  },

  opacity: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '100': '1',
  },
  whiteSpace: {
    'none':'nowrap'
  },


  svgFill: {
    'current': 'currentColor',
  },


  svgStroke: {
    'current': 'currentColor',
  },


  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus','active'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['responsive', 'hover', 'focus','active'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'focus','active'],
    height: ['responsive', 'hover'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive', 'hover'],
    maxWidth: ['responsive', 'hover'],
    minHeight: ['responsive', 'hover'],
    minWidth: ['responsive', 'hover'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    outline: ['focus','active'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'focus','active'],
    svgFill: [],
    svgStroke: [],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus','active'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus','active'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive', 'hover'],
    zIndex: ['responsive'],
  },

  plugins: [
    require('tailwindcss/plugins/container')({
      // center: true,
      // padding: '1rem',
    }),
  ],


  options: {
    prefix: '',
    important: false,
    separator: ':',
  },

}
