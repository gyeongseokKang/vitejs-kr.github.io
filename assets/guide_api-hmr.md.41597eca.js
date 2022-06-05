import{_ as s,c as a,o as n,a as l}from"./app.d2cb6192.js";const A='{"title":"HMR API","description":"","frontmatter":{"title":"HMR API"},"headers":[{"level":2,"title":"\uD544\uC218\uC801\uC778 Conditional Guard","slug":"required-conditional-guard"},{"level":2,"title":"hot.accept(cb)","slug":"hot-accept-cb"},{"level":2,"title":"hot.accept(deps, cb)","slug":"hot-accept-deps-cb"},{"level":2,"title":"hot.dispose(cb)","slug":"hot-dispose-cb"},{"level":2,"title":"hot.data","slug":"hot-data"},{"level":2,"title":"hot.decline()","slug":"hot-decline"},{"level":2,"title":"hot.invalidate()","slug":"hot-invalidate"},{"level":2,"title":"hot.on(event, cb)","slug":"hot-on-event-cb"},{"level":2,"title":"hot.send(event, data)","slug":"hot-send-event-data"}],"relativePath":"guide/api-hmr.md"}',o={name:"guide/api-hmr.md"},p=l(`<h1 id="hmr-api" tabindex="-1">HMR API <a class="header-anchor" href="#hmr-api" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">\uCC38\uACE0</p><p>\uD574\uB2F9 \uBB38\uC11C\uB294 \uD074\uB77C\uC774\uC5B8\uD2B8 \uCABD HMR API\uC785\uB2C8\uB2E4. HMR \uBCC0\uACBD\uC744 \uC81C\uC5B4\uD558\uB294 \uD50C\uB7EC\uADF8\uC778\uC740 <a href="./api-plugin.html#handlehotupdate">\uB2E4\uC74C</a>\uC744 \uCC38\uACE0\uD574 \uC8FC\uC138\uC694.</p><p>HMR API \uC124\uC815\uC740 \uAE30\uBCF8\uC801\uC73C\uB85C \uD504\uB808\uC784\uC6CC\uD06C\uB098 Vite \uC9C0\uC6D0 \uB3C4\uAD6C \uC6D0\uC791\uC790\uB97C \uC704\uD574 \uB9CC\uB4E4\uC5B4\uC84C\uC2B5\uB2C8\uB2E4. \uCD5C\uC885 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC788\uC5B4\uC11C\uB294 HMR\uC740 \uD2B9\uC815 \uD504\uB808\uC784\uC6CC\uD06C \uC2A4\uD0C0\uD130 \uD15C\uD50C\uB9BF\uC5D0 \uC774\uBBF8 \uCC98\uB9AC\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.</p></div><p>Vite\uB294 HMR API \uC124\uC815\uC744 <code>import.<wbr>meta.hot</code> \uAC1D\uCCB4\uB97C \uD1B5\uD574 \uB178\uCD9C\uD569\uB2C8\uB2E4:</p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ImportMeta</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">hot</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ViteHotContext</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ViteHotContext</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accept</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accept</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">cb</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mod</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accept</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">dep</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cb</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mod</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accept</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">deps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cb</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">dispose</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">cb</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">decline</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">invalidate</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// \`InferCustomEventPayload\`\uB294 \uB0B4\uC7A5\uB41C(Built-in) Vite \uC774\uBCA4\uD2B8\uC5D0 \uB300\uD55C \uD0C0\uC785\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">on</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;(</span></span>
<span class="line"><span style="color:#A6ACCD;">    event</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">cb</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">payload</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InferCustomEventPayload</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">send</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InferCustomEventPayload</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="required-conditional-guard" tabindex="-1">\uD544\uC218\uC801\uC778 Conditional Guard <a class="header-anchor" href="#required-conditional-guard" aria-hidden="true">#</a></h2><p>\uCCAB \uBC88\uC9F8\uB85C, \uD504\uB85C\uB355\uC158\uC5D0\uC11C \uD2B8\uB9AC \uC170\uC774\uD0B9 \uD558\uAE30 \uC704\uD574 HMR API\uB97C \uC0AC\uC6A9\uD558\uAE30 \uC55E\uC11C conditional block\uC744 \uD574\uB193\uB294 \uAC83\uC774 \uC88B\uC2B5\uB2C8\uB2E4:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// HMR code</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="hot-accept-cb" tabindex="-1"><code>hot.accept(cb)</code> <a class="header-anchor" href="#hot-accept-cb" aria-hidden="true">#</a></h2><p>\uC2A4\uC2A4\uB85C \uC218\uC6A9\uD558\uB294 \uBAA8\uB4C8\uC744 \uC704\uD574 \uBCC0\uACBD\uB41C \uBAA8\uB4C8\uC744 \uC778\uC790\uB85C \uBC1B\uB294 \uCF5C\uBC31\uACFC \uD568\uAED8 <code>import.<wbr>meta.hot.accpet</code>\uB97C \uC0AC\uC6A9\uD558\uC138\uC694:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">accept</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">newModule</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">updated: count is now </span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newModule</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Hot updates\uB97C &quot;\uC218\uC6A9\uD55C&quot; \uBAA8\uB4C8\uC740 <strong>HMR \uBC94\uC704</strong>\uB85C \uAC04\uC8FC\uB429\uB2C8\uB2E4.</p><p>Vite\uC740 \uCC98\uC74C\uC5D0 \uBD88\uB7EC\uC628 \uBAA8\uB4C8\uC744 \uAD50\uD658\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4: \uB9CC\uC57D\uC5D0 HMR \uBC94\uC704\uC758 \uBAA8\uB4C8\uC774 \uB514\uD39C\uB358\uC2DC\uB85C\uBD80\uD130 imports\uB97C \uB2E4\uC2DC exports \uD55C\uB2E4\uBA74, \uD574\uB2F9 re-exports\uB97C \uC5C5\uB370\uC774\uD2B8\uD560 \uCC45\uC784\uC774 \uC788\uC2B5\uB2C8\uB2E4 (\uADF8\uB9AC\uACE0 \uADF8\uB7EC\uD55C exports\uB294 <code>let</code>\uC744 \uC0AC\uC6A9\uD558\uC600\uC744 \uAC83\uC785\uB2C8\uB2E4). \uAC8C\uB2E4\uAC00 \uACBD\uACC4 \uBAA8\uB4C8\uC5D0\uC11C \uCCB4\uC778 \uC704\uC5D0 \uC788\uB294 importers\uC5D0\uAC8C\uB294 \uBCC0\uD654\uAC00 \uB418\uC5C8\uB2E4\uACE0 \uC54C\uB9AC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</p><p>Vite\uC758 \uAC04\uC18C\uD654\uB41C HMR \uAE30\uB2A5\uC740 \uD504\uB85D\uC2DC \uBAA8\uB4C8\uC744 \uC0DD\uC0B0\uD558\uB294 \uAC83\uACFC \uAC19\uC740 \uBE44\uC6A9\uC774 \uD070\uC77C\uC744 \uD558\uC9C0 \uC54A\uACE0\uC11C \uB300\uBD80\uBD84\uC758 \uAC1C\uBC1C \uD658\uACBD\uC5D0\uC11C \uCDA9\uBD84\uD569\uB2C8\uB2E4.</p><h2 id="hot-accept-deps-cb" tabindex="-1"><code>hot.accept(deps, cb)</code> <a class="header-anchor" href="#hot-accept-deps-cb" aria-hidden="true">#</a></h2><p>\uBAA8\uB4C8\uC740 \uC2A4\uC2A4\uB85C \uB9AC\uB85C\uB529\uC744 \uD558\uC9C0 \uC54A\uACE0 \uC9C1\uC811\uC801\uC778 \uC758\uC874\uC131\uC73C\uB85C \uBCC0\uACBD\uC744 \uC218\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">foo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./foo.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">accept</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./foo.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">newFoo</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \uCF5C\uBC31\uC73C\uB85C \uBCC0\uACBD\uB41C &#39;./foo.js&#39; \uBAA8\uB4C8\uC744 \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">newFoo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">foo</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// \uB610\uD55C dep \uBAA8\uB4C8\uB4E4\uC744 \uC5B4\uB808\uC774\uB85C \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">accept</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">    [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./foo.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./bar.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;">newFooModule</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newBarModule</span><span style="color:#89DDFF;">])</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// \uCF5C\uBC31\uC73C\uB85C \uBCC0\uACBD\uB41C \uBAA8\uB4C8\uB4E4\uC744 \uC5B4\uB808\uC774\uB85C \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="hot-dispose-cb" tabindex="-1"><code>hot.dispose(cb)</code> <a class="header-anchor" href="#hot-dispose-cb" aria-hidden="true">#</a></h2><p>\uC2A4\uC2A4\uB85C \uC218\uC6A9\uD558\uB294 \uBAA8\uB4C8 \uD639\uC740 \uB2E4\uB978 \uAC83\uC5D0 \uC758\uD574 \uC218\uC6A9\uB420 \uBAA8\uB4C8\uC740 \uBCC0\uACBD\uB41C \uBCF5\uC0AC\uBCF8\uC73C\uB85C \uC778\uD55C \uC9C0\uC18D\uC801\uC778 \uBD80\uC791\uC6A9\uC744 \uC815\uB9AC\uD558\uAE30 \uC704\uD574 <code>hot.dispose</code>\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setupSideEffect</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">setupSideEffect</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hot</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dispose</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// side effect\uB97C \uCC98\uB9AC\uD568</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="hot-data" tabindex="-1"><code>hot.data</code> <a class="header-anchor" href="#hot-data" aria-hidden="true">#</a></h2><p><code>import.<wbr>meta.hot.data</code> \uAC1D\uCCB4\uB294 \uAC19\uC774 \uBCC0\uACBD\uB41C \uAC01\uAE30 \uB2E4\uB978 \uBAA8\uB4C8\uB4E4\uC758 \uC778\uC2A4\uD134\uC2A4\uB4E4\uC5D0\uC11C \uC9C0\uC18D\uB429\uB2C8\uB2E4. \uD574\uB2F9 \uAC1D\uCCB4\uB294 \uC804 \uBC84\uC804\uC758 \uBAA8\uB4C8 \uC815\uBCF4\uB97C \uB2E4\uC74C \uBC84\uC804\uC758 \uBAA8\uB4C8\uC5D0\uAC8C \uC804\uB2EC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</p><h2 id="hot-decline" tabindex="-1"><code>hot.decline()</code> <a class="header-anchor" href="#hot-decline" aria-hidden="true">#</a></h2><p><code>import.<wbr>meta.hot.decline()</code>\uC740 \uD574\uB2F9 \uBAA8\uB4C8\uC774 hot-\uC5C5\uB370\uC774\uD2B8\uAC00 \uBD88\uAC00\uB2A5\uD568\uC744 \uAC00\uB9AC\uD0A4\uACE0 \uB9CC\uC57D \uC774 \uBAA8\uB4C8\uC774 \uBCC0\uACBD\uC774 \uB418\uC5B4\uC57C \uD55C\uB2E4\uBA74 \uBE0C\uB77C\uC6B0\uC800 \uC804\uCCB4 \uB9AC\uB85C\uB4DC\uAC00 \uC2E4\uD589\uC774 \uB418\uC5B4\uC57C \uD568\uC744 \uC54C\uB824\uC90D\uB2C8\uB2E4.</p><h2 id="hot-invalidate" tabindex="-1"><code>hot.invalidate()</code> <a class="header-anchor" href="#hot-invalidate" aria-hidden="true">#</a></h2><p><code>import.<wbr>meta.hot.invalidate()</code>\uB97C \uD638\uCD9C\uD558\uBA74 \uD398\uC774\uC9C0\uAC00 \uB9AC\uB85C\uB4DC\uAC00 \uB429\uB2C8\uB2E4.</p><h2 id="hot-on-event-cb" tabindex="-1"><code>hot.on(event, cb)</code> <a class="header-anchor" href="#hot-on-event-cb" aria-hidden="true">#</a></h2><p>HMR \uC774\uBCA4\uD2B8\uC5D0 \uB300\uD55C \uD578\uB4E4\uB7EC\uB97C \uC815\uC758\uD569\uB2C8\uB2E4.</p><p>\uB2E4\uC74C HMR \uC774\uBCA4\uD2B8\uB4E4\uC740 Vite\uC5D0\uC11C \uC790\uB3D9\uC801\uC73C\uB85C \uD638\uCD9C\uB429\uB2C8\uB2E4:</p><ul><li><code>&#39;vite:beforeUpdate&#39;</code>\uC740 \uBCC0\uACBD\uC774 \uC801\uC6A9\uB418\uAE30 \uC804\uC5D0 \uD638\uCD9C\uB429\uB2C8\uB2E4. (e.g. \uBAA8\uB4C8\uC774 \uBCC0\uACBD\uB420 \uC608\uC815\uC77C \uB54C)</li><li><code>&#39;vite:beforeFullReload&#39;</code>\uC740 \uC804\uCCB4 \uB9AC\uB85C\uB4DC\uAC00 \uC77C\uC5B4\uB098\uAE30 \uC804\uC5D0 \uD638\uCD9C\uB429\uB2C8\uB2E4.</li><li><code>&#39;vite:beforePrune&#39;</code>\uC740 \uBAA8\uB4C8\uB4E4\uC774 \uD544\uC694\uAC00 \uC5C6\uC5B4\uC838\uC11C \uC81C\uAC70\uB420 \uB54C \uD638\uCD9C\uB429\uB2C8\uB2E4.</li><li><code>&#39;vite:error&#39;</code>\uC740 \uC5D0\uB7EC\uAC00 \uC77C\uC5B4\uB0AC\uC744 \uB54C \uD638\uCD9C\uB429\uB2C8\uB2E4. (e.g. syntax error)</li></ul><p>\uD50C\uB7EC\uADF8\uC778\uB4E4\uB85C\uBD80\uD130 \uC0C8\uB85C\uC6B4 HMR \uC774\uBCA4\uD2B8\uB4E4\uC744 \uBCF4\uB0BC \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB354 \uB9CE\uC740 \uC815\uBCF4\uB294 <a href="./api-plugin.html#handlehotupdate">handleHotUpdate</a>\uB97C \uCC38\uACE0\uD574 \uC8FC\uC138\uC694.</p><h2 id="hot-send-event-data" tabindex="-1"><code>hot.send(event, data)</code> <a class="header-anchor" href="#hot-send-event-data" aria-hidden="true">#</a></h2><p>\uCEE4\uC2A4\uD140 \uC774\uBCA4\uD2B8\uB97C Vite\uC758 \uAC1C\uBC1C \uC11C\uBC84\uB85C \uB418\uB3CC\uB824 \uBCF4\uB0C5\uB2C8\uB2E4.</p><p>\uB9CC\uC57D \uC5F0\uACB0\uB418\uAE30 \uC804\uC5D0 \uD638\uCD9C\uB41C\uB2E4\uBA74 \uB370\uC774\uD130\uB294 \uBC84\uD37C\uC5D0\uC11C \uC7A0\uC2DC \uB300\uAE30\uD558\uACE0 \uC774\uD6C4 \uC5F0\uACB0\uC774 \uC124\uC815\uB418\uC5C8\uC744 \uB54C \uC804\uC1A1\uD558\uAC8C \uB429\uB2C8\uB2E4.</p><p>\uC880 \uB354 \uC790\uC138\uD55C \uB0B4\uC6A9\uC740 <a href="/guide/api-plugin.html#client-server-communication">\uD074\uB77C\uC774\uC5B8\uD2B8-\uC11C\uBC84 \uCEE4\uBBA4\uB2C8\uCF00\uC774\uC158</a>\uC744 \uCC38\uACE0\uD574\uC8FC\uC138\uC694.</p>`,34),e=[p];function t(c,r,F,y,D,i){return n(),a("div",null,e)}var d=s(o,[["render",t]]);export{A as __pageData,d as default};
