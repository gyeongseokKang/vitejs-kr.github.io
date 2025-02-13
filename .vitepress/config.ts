import { defineConfig } from 'vitepress'

const ogDescription = 'Vite, 차세대 프런트엔드 개발 툴'
const ogImage = 'https://vitejs-kr.github.io/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs-kr.github.io'

export default defineConfig({
  title: 'Vite',
  lang: 'ko',
  description: '차세대 프런트엔드 개발 툴',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    [
      'script',
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-V8ZS1G7X21' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-V8ZS1G7X21');`
    ]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern:
        'https://github.com/vitejs-kr/vitejs-kr.github.io/edit/main/:path',
      text: '이 페이지 수정하기'
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/vitejs/vite' }
    ],

    algolia: {
      appId: 'BH4D9OD16A',
      apiKey: 'b573aa848fd57fb47d693b531297403c',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:en']
      }
    },

    carbonAds: {
      code: 'CEBIEK3N',
      placement: 'vitejsdev'
    },

    localeLinks: {
      text: '한국어',
      items: [
        { text: 'English', link: 'https://vitejs.dev' },
        { text: '简体中文', link: 'https://cn.vitejs.dev' },
        { text: '日本語', link: 'https://ja.vitejs.dev' },
        { text: 'Español', link: 'https://es.vitejs.dev' }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You & Vite Contributors'
    },

    nav: [
      { text: '가이드', link: '/guide/', activeMatch: '/guide/' },
      { text: '설정', link: '/config/', activeMatch: '/config/' },
      { text: '플러그인', link: '/plugins/', activeMatch: '/plugins/' },
      {
        text: '리소스',
        items: [
          { text: 'Team', link: '/team' },
          {
            items: [
              {
                text: '트위터',
                link: 'https://twitter.com/vite_js'
              },
              {
                text: '디스코드',
                link: 'https://chat.vitejs.dev'
              },
              {
                text: 'Awesome Vite',
                link: 'https://github.com/vitejs/awesome-vite'
              },
              {
                text: '개발 커뮤니티',
                link: 'https://dev.to/t/vite'
              },
              {
                text: '호환 가능한 Rollup 플러그인',
                link: 'https://vite-rollup-plugins.patak.dev/'
              },
              {
                text: '변경 사항',
                link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md'
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '가이드',
          items: [
            {
              text: 'Vite를 사용해야 하는 이유',
              link: '/guide/why'
            },
            {
              text: '시작하기',
              link: '/guide/'
            },
            {
              text: '지원하는 기능들',
              link: '/guide/features'
            },
            {
              text: '플러그인 사용하기',
              link: '/guide/using-plugins'
            },
            {
              text: '사전 번들링 된 디펜던시',
              link: '/guide/dep-pre-bundling'
            },
            {
              text: '에셋 가져오기',
              link: '/guide/assets'
            },
            {
              text: '프로덕션 버전으로 빌드하기',
              link: '/guide/build'
            },
            {
              text: '정적 웹 페이지로 배포하기',
              link: '/guide/static-deploy'
            },
            {
              text: 'Vite의 환경 변수와 모드',
              link: '/guide/env-and-mode'
            },
            {
              text: '서버 측 렌더링 (SSR)',
              link: '/guide/ssr'
            },
            {
              text: '백엔드 프레임워크와 함께 사용하기',
              link: '/guide/backend-integration'
            },
            {
              text: '다른 빌드 도구와의 차이점',
              link: '/guide/comparisons'
            },
            {
              text: 'v2에서 마이그레이션하기',
              link: '/guide/migration'
            },
            {
              text: 'v1에서 마이그레이션하기',
              link: '/guide/migration-from-v1'
            }
          ]
        },
        {
          text: 'APIs',
          items: [
            {
              text: '플러그인 API',
              link: '/guide/api-plugin'
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr'
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript'
            },
            {
              text: 'Vite 설정 레퍼런스',
              link: '/config/'
            }
          ]
        }
      ],
      '/config/': [
        {
          text: 'Config',
          items: [
            {
              text: 'Vite 설정하기',
              link: '/config/'
            },
            {
              text: '공용 옵션',
              link: '/config/shared-options'
            },
            {
              text: '서버 옵션',
              link: '/config/server-options'
            },
            {
              text: '빌드 옵션',
              link: '/config/build-options'
            },
            {
              text: '프리뷰 옵션',
              link: '/config/preview-options'
            },
            {
              text: '디펜던시 최적화 옵션',
              link: '/config/dep-optimization-options'
            },
            {
              text: 'SSR 옵션',
              link: '/config/ssr-options'
            },
            {
              text: '워커 옵션',
              link: '/config/worker-options'
            }
          ]
        }
      ]
    }
  },
  markdown: {
    anchor: {
      // @ts-ignore
      renderPermalink: require('./render-permalink')
    },
    config: (md) => md.use(require('./custom-anchor'))
  }
})
