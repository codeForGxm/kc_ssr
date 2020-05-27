## 项目名称
kc_ssr

## 项目介绍
该项目为了-旧有项目的freemarker方式 进行vue-ssr的升级改造：

# install dependencies
npm install
# serve in dev mode, with hot reload at localhost:3000
npm run dev
# build for production 
npm run build
# build for production and start server
npm run dev_build
# 其他介绍

本项目为MPA配置，同时支持在page中在进行SPA操作。
如果某一page需要spa参照pages/page1下的配置信息，否则参照pages/page2

- 1、server/server.js 配置http server，开dev方式下，引用了config/set-dev-server.js（进行热重载）

- 2、src/pages/** entry-client.js entry-server.js 分别用以区分客户端和服务端入口，entry-client.js：server进行渲染初始状态之后，由客户端进行接管进行后续

- 3、entry-server.js 检测page中所需要的异步数据，由server进行预操作（检测asyncData进行预取，这里用VUEX进行配合，主要为满足one page 多个server接口返回初始数据，需要进行预取数据的复杂情形，如果one page one api进行初始数据渲染，可以采用props这种更加简单的方式）

- 4、page中 asyncData 采用数组的方式（满足多个api需要预取数据）

  预取方式：store.dispatch('getInitData', {initData: fetchBar, 'key': 'bar'})

  其中 fetchBar 为异步获取数据的接口

  bar 为取到数据之后，数据存放在 state.initPageData 的键值（如果one page 多个api进行语句，主要key值不要重复，负责后面的数据会覆盖前面的数据）

  store中根据initData，和 key 用来获取 page中传入的异步接口和数据存放key值


- 5、store 中 initPageData带个per page的预取数据，在切换页面的时候，会进行覆盖。（这里并没有采用 per page or compennt懒注册的方式，因为切换会覆盖，不存在 muti page 公用数据 造成数据污染的问题）



文档和技术方案还要很多有待完善。。。。。

```
kc_ssr
├─ .DS_Store
├─ .babelrc
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ master
│  │     │  ├─ pack4
│  │     │  └─ webpack_version
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ dependabot
│  │           │  └─ npm_and_yarn
│  │           │     ├─ acorn-5.7.4
│  │           │     ├─ js-yaml-3.13.1
│  │           │     ├─ lodash-4.17.15
│  │           │     ├─ lodash.template-4.5.0
│  │           │     ├─ mixin-deep-1.3.2
│  │           │     └─ webpack-dev-server-3.1.11
│  │           ├─ master
│  │           └─ pack4
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ dd1190223f176719dcf6d58ff1621a76f5341f
│  │  ├─ 02
│  │  │  └─ 12c51ec5a4681da72872c95e6bea9f2475ea54
│  │  ├─ 03
│  │  │  └─ 5319fa59f5e665038ca248691c87e101838290
│  │  ├─ 04
│  │  │  └─ b53391b205110bf295962bb414316e3078784d
│  │  ├─ 05
│  │  │  └─ a3f91d99f4da08588a3d6a2c09828af0658d35
│  │  ├─ 0c
│  │  │  ├─ 76ca928086070d6c620dcb65886a18eae9ce52
│  │  │  └─ 7d66d5248555d9acf2dab62b1c865d7989d3ec
│  │  ├─ 0d
│  │  │  └─ 9ff0044b608a2ecbbfeac700d2a487561e68aa
│  │  ├─ 10
│  │  │  └─ 8fc4e8d10b5aa9ba5dd0ee2b886a06966f1255
│  │  ├─ 11
│  │  │  └─ a27c4005abc2a9b4847759f4c765728f2c4ba5
│  │  ├─ 12
│  │  │  └─ d15cc2489ddead005995a29d24db856c2ed5ce
│  │  ├─ 15
│  │  │  └─ 9d4661c3a7102dfe2138f42d09d13a3b1c46f0
│  │  ├─ 18
│  │  │  └─ 9d896aa79c77e15214ce1f2701e7596371efe0
│  │  ├─ 1a
│  │  │  └─ 2e756a6cfe4d45017caff81830e2fc00e4c792
│  │  ├─ 1d
│  │  │  ├─ 113e8697cc7a912b9443f6533e53ea27986183
│  │  │  └─ d6a5d42704b7e94d88a3fd73ca730532ad2531
│  │  ├─ 1f
│  │  │  └─ d1bf2d29bc120d39b7bc8e6f438c39763eb93c
│  │  ├─ 20
│  │  │  ├─ 0657b660f55fb302696a8540d2550bb368e03a
│  │  │  ├─ 76242c34130737472105845dc6bbe0ad475730
│  │  │  └─ b644e9929bbd87ecb54fe22895d8288deb2d42
│  │  ├─ 22
│  │  │  └─ 86857c7d82edbf42818de443130f98ffb44b70
│  │  ├─ 24
│  │  │  ├─ 33de79873b61bf71093b2459c54857c223bffb
│  │  │  └─ 8cde9ca0527400e699d6e62fd1d75c87f486f6
│  │  ├─ 26
│  │  │  └─ 8794d813f0d85ac55f32e01242ce46e5633b38
│  │  ├─ 27
│  │  │  ├─ 0d29c040a5370aab229718a55499fe5acdcd52
│  │  │  └─ 414ff61f655414febe0a160a66cd3609fa58ea
│  │  ├─ 29
│  │  │  └─ 588fd3d814930116a7763cd9a9a30974b39de5
│  │  ├─ 2c
│  │  │  ├─ 5c68e5607b6927620e2db6f7aea7bcdc2dfaf8
│  │  │  └─ 88d3f7ad36b7924981d90a32de299287c59e11
│  │  ├─ 2d
│  │  │  └─ 598c5d200b96c0b48a7bb7a0f8f26343dd8b50
│  │  ├─ 2e
│  │  │  └─ 14b211c3e8568f4dff7983e11240fe3e3d7fdb
│  │  ├─ 2f
│  │  │  └─ 3cca413dbb377c673ec0c0f9f0f4a8d690ebc7
│  │  ├─ 30
│  │  │  ├─ 57d9eaeaf3c605cb84cffc7ba24dc2782cdaca
│  │  │  └─ cd3c9da6a35d1354758879fe23a4748f9f4e6e
│  │  ├─ 32
│  │  │  └─ 61e91383d6e81a41b6ab238c5a2e482b410440
│  │  ├─ 33
│  │  │  └─ 593da13a559ced28704c318cb6979cc50c6ebe
│  │  ├─ 34
│  │  │  └─ 816b1fe210a3bd9c46a176dc32a4d48f8af104
│  │  ├─ 37
│  │  │  └─ ebd5ce81c0129c19a36eb5a9108fa435ae9ab9
│  │  ├─ 39
│  │  │  └─ f8c528286b07f31180e0d3a8f534c05fbddbb6
│  │  ├─ 3a
│  │  │  ├─ 5c117754e9a132ab594b6f402031051be0072b
│  │  │  └─ fb342c0c979b0520ea2e8cc1332d7e40309de5
│  │  ├─ 3b
│  │  │  └─ c5c2aab4a651e22b42c30c73e19a179cbf0d7a
│  │  ├─ 3c
│  │  │  └─ a8e740245dca7b733452f15efc9f2c94af3c95
│  │  ├─ 3e
│  │  │  └─ b40f555db7ff56d99020f8d09fd344ec54148b
│  │  ├─ 40
│  │  │  └─ ba2b52488befeb0bece5c937fffc052e8adba4
│  │  ├─ 42
│  │  │  └─ 5f92dcb1ac8c8f229fbe14124b5aa5f884eee2
│  │  ├─ 43
│  │  │  └─ adf4afc76d8d52a3bdc6a7b3ef42dba19cca78
│  │  ├─ 45
│  │  │  └─ ea3d7e2ff681115e31987f3ffb140dcd47c3d7
│  │  ├─ 46
│  │  │  └─ b68b814b60397d1d216b1933581173b00a94a0
│  │  ├─ 47
│  │  │  └─ 1979949190bed4c331997e1c2e9dcf2f7d0555
│  │  ├─ 4b
│  │  │  └─ 21ecf00ffa26300439f8e5ef5ebe80dc3f94f9
│  │  ├─ 4c
│  │  │  └─ a1eac2c7e73bf5138fd224b1be8d95e03ec979
│  │  ├─ 4d
│  │  │  └─ 84bba6e4c3acc9b102452abd08b7dd7d1d8951
│  │  ├─ 4e
│  │  │  ├─ 14d160fa5ec87f245b19f6b86dc200ee24ef86
│  │  │  └─ faf143cf023a8d9f469e5b80ab5f6da60bb519
│  │  ├─ 50
│  │  │  ├─ 4533b61e09043b1397e7ebce61bbca52ea4340
│  │  │  ├─ 814cf2f5fb8f7ff2f8c35516dca6fca52d4a39
│  │  │  ├─ 940bcfbd4db8093efa247df806215887ac2356
│  │  │  └─ f61118b80a851ec1900b46d68202ed643335d9
│  │  ├─ 52
│  │  │  └─ 13dc8ff470efbfc00735a141b6a24fd5509991
│  │  ├─ 54
│  │  │  ├─ 3986ee32f85192e435ea3ac1667324d3d8a13d
│  │  │  └─ 5237a097fa6d5b4541b22b1b88265f99990289
│  │  ├─ 55
│  │  │  └─ 335ba55e33f9084f0106bbbaeb6716e2be8bfb
│  │  ├─ 56
│  │  │  └─ 71903eaaffbf0e842a335199c27b081d34567f
│  │  ├─ 5a
│  │  │  └─ 460f1998db40f92531708239eecda462cec1a3
│  │  ├─ 5e
│  │  │  └─ 2bfd2b44a123f79f7bd5aeec42bdfcd438c7d6
│  │  ├─ 60
│  │  │  └─ 2c0e39e827122b1983a22f2d3e49c14ca55931
│  │  ├─ 61
│  │  │  ├─ 52e4e07bd6acd0b9553023b4b6576ec98dd870
│  │  │  └─ a1e13c460e98e8570c3f0329ef036b2dade138
│  │  ├─ 63
│  │  │  └─ 0bd8a65cc658a054d04d2dcccf3d65455920b0
│  │  ├─ 64
│  │  │  └─ be744947d3c32e63c5873dd94f02831773478a
│  │  ├─ 68
│  │  │  └─ 145acf657e472d18d1b037d21e8815b8546b30
│  │  ├─ 69
│  │  │  └─ 7e445a3ad3ff4825298b2aa2bf2ad2cdf1a6fd
│  │  ├─ 6d
│  │  │  └─ ab04541d837f124151ff2aa6037d6faf7aedc9
│  │  ├─ 70
│  │  │  └─ c54fcbeddd668bde25a8fc59cb138b3bd16025
│  │  ├─ 71
│  │  │  └─ 9967e52fa882dcf4bc0633e5b4d13b22b52a1e
│  │  ├─ 73
│  │  │  ├─ 077149637d1812083714d1fac39b85985fc3c3
│  │  │  ├─ 4cc1b414865926fbecc4d80ed77b0446b282a3
│  │  │  └─ ba2b34231cf09d2f8965ef32a5b01be31eba1b
│  │  ├─ 75
│  │  │  └─ cace9b697058e883c3b1cf204aaef0480afe62
│  │  ├─ 76
│  │  │  └─ 94bb654ec18e917723fa92ed6a0de2d52e01e2
│  │  ├─ 79
│  │  │  └─ cd848297cfa9e3e2b2c94c5051b802d28ebfe2
│  │  ├─ 7a
│  │  │  ├─ 30b12ca02a538619e68549a76db6c2f3d7e01c
│  │  │  ├─ 498f5a81e6d51dc3c04c83275642e066c02b0b
│  │  │  ├─ 8e71690f1ce6d4acb28837cb6f8a7d3555e7d8
│  │  │  └─ ce20c265d358f8cd2c191be466a02ac2fdb173
│  │  ├─ 7c
│  │  │  └─ 01d2a6594c4aa093da34fd03559baac053d6f5
│  │  ├─ 7e
│  │  │  └─ 08840b5884cc752012eaef4b2d63c9715c22c4
│  │  ├─ 7f
│  │  │  ├─ bf1addf5823f6fafbfe00a4c7e62e869e37f98
│  │  │  └─ f8b9a9376b98b903b7310a885b841a837f41f6
│  │  ├─ 81
│  │  │  └─ c24b4ef23f933dd9a0a908896fe0af4ee08207
│  │  ├─ 82
│  │  │  └─ d7901a00009faefaa520f7baf2974857d9d950
│  │  ├─ 87
│  │  │  ├─ 491bed97bac2fcdc81895f9d24924fea0f2607
│  │  │  └─ d9445358b8d6ead654a17c970356cee4899cf8
│  │  ├─ 88
│  │  │  └─ e1ebbc9e5d2bfae2c2ab3d870c69877c200ecf
│  │  ├─ 8a
│  │  │  └─ 734fc5c640b284395bef9e6d4e68d6bd2ee59e
│  │  ├─ 8c
│  │  │  └─ f9bdab556efe508edf3c0cce552e0c7329493e
│  │  ├─ 8d
│  │  │  └─ 6399e7420bbc94e9f7b16d34ebffaa098d448e
│  │  ├─ 90
│  │  │  └─ 4535bc2125724557e8d8dc0b839671aa591fc0
│  │  ├─ 93
│  │  │  ├─ 4b0b5c03a6a2d64e9f1073459eea13d0a867cb
│  │  │  └─ dd0d9dd6752fe428e78fc55b79be0fd4bc263d
│  │  ├─ 96
│  │  │  └─ 57fa858c4298ff2617f5970692fad4d45c69af
│  │  ├─ 97
│  │  │  └─ e86fcba081b3ef604f03f1535f369bfa527eb6
│  │  ├─ 98
│  │  │  ├─ 557f0c6896ab6bfa24e66e2f1271955d90ee98
│  │  │  └─ 97b3d280b73817bf65ddef85ff652e5726d77b
│  │  ├─ 99
│  │  │  └─ 0fa8fbea0c1c797822513d026cde04c70c9774
│  │  ├─ 9a
│  │  │  └─ f93f55c352f6b1c0fce476403d563feb5d23e4
│  │  ├─ 9b
│  │  │  └─ da57fcf00aeb04568aac3623907bc72fa13149
│  │  ├─ 9c
│  │  │  ├─ 1b4d53ea46447d083226c75702bcd2ca7bef75
│  │  │  └─ 97c9312994b725ce8ed04eb146d28148ccb04f
│  │  ├─ 9e
│  │  │  ├─ 5606272f159baa477b75900b7551bd72ce497d
│  │  │  └─ c1a0954a4a37481e8c8bff278e094f0d01be67
│  │  ├─ a0
│  │  │  └─ 23fd84c3e0d349dba2f673d9b218128291d32e
│  │  ├─ a1
│  │  │  ├─ 2bca86968c6c1ce8040bb699982b54880868db
│  │  │  └─ f391415c821dfffaa7c2758cbb624b786f80b2
│  │  ├─ a3
│  │  │  └─ 37920b9ec8197be3265d1c083e912db34ad65b
│  │  ├─ a4
│  │  │  ├─ 435394f67748500d93ee2e551e109cfbcbe912
│  │  │  └─ fcf0efddc1db4bb1f367adadd14f6e7575c79b
│  │  ├─ a5
│  │  │  └─ a21cb2da2870b2cf95b1e8238bc75387e09816
│  │  ├─ a7
│  │  │  ├─ a0b4b38544b3fb2200e2815b07a54d0ac7c514
│  │  │  └─ a6e91ff301416a0d6494d9bcd5b5df26aab583
│  │  ├─ aa
│  │  │  ├─ 2911dfe9bfbd8d78d893c7a0be3c4213a94209
│  │  │  ├─ 6225efd0d28ba3ca9a7492e5a4a34ece0e0868
│  │  │  └─ d3d909d75025414f4c5525a75bb459acddb542
│  │  ├─ ac
│  │  │  └─ 80acb18f936e502e8a39e9c18e87c12b495d63
│  │  ├─ ae
│  │  │  ├─ 613cfab04cf1edfcc62ac5326d3c1d4c734869
│  │  │  └─ d264ae3f12d2289b4a4da3b57af62c425106c6
│  │  ├─ af
│  │  │  └─ 057d4dcd9ae82b2a18894b34a018465d2cfedc
│  │  ├─ b0
│  │  │  └─ 317a3d3b4d72df6084780d61f0d2194a3c7740
│  │  ├─ b1
│  │  │  └─ f53e8cd0b5d60a53cb8c091c8f9b009081585d
│  │  ├─ b2
│  │  │  └─ b0d273f3bf4239894e6a3700e876a87244f701
│  │  ├─ b4
│  │  │  └─ 8b94c8d56113d2b670b6ee02f3e642c8f5ff3f
│  │  ├─ b5
│  │  │  └─ d0d88716b4208eec0296b58cb84c222b45b9c4
│  │  ├─ b8
│  │  │  ├─ b4d09e395bed8bba3bbc8fb2134384a718cbc6
│  │  │  └─ fa172642cb97f707322314322c63c043398640
│  │  ├─ b9
│  │  │  └─ 5def98cbfb4611ff959c8b63cb5c87e9c6e623
│  │  ├─ bb
│  │  │  └─ fe3fce9f17f7494a54b8de9a4a1887932a3b64
│  │  ├─ bd
│  │  │  ├─ 13795b7ce52fa12cf07439dbd6777cc6267919
│  │  │  └─ 64ca04f88ac2499530fb2d85cd1a284314e7a3
│  │  ├─ be
│  │  │  └─ 693a0ee3da51fbbae10db35da29f161e09edbe
│  │  ├─ c1
│  │  │  └─ 06687efac00ae21f239686c3874fb4faeb92ce
│  │  ├─ c2
│  │  │  └─ d764c9546685ce1de8111b096b6262424a4dae
│  │  ├─ c6
│  │  │  └─ 15796dc9267c51ad6764364d84ec87ebf0b4d4
│  │  ├─ c7
│  │  │  ├─ 03befe0d37f0b57c0576ca55f6c1e15a5fd252
│  │  │  ├─ b29940b4cb2f972e4b9503d2ecdd48e9777d6c
│  │  │  └─ bf539aeda03def2b2e815f72f5241fc4635818
│  │  ├─ c8
│  │  │  └─ 98030a97a945835edcef1f3394addca4244a6a
│  │  ├─ c9
│  │  │  ├─ 629f16442bc1275f29757c07b4d17286d661f0
│  │  │  ├─ 672d0359f36000b811855201d9d8a778a44ee6
│  │  │  └─ afce4b6a8d448120c6f72c39c9f1ea6fc1008c
│  │  ├─ ca
│  │  │  └─ 39f688032fcc821e9ff14a840b15f6b0feb3aa
│  │  ├─ cb
│  │  │  ├─ 09b23a1196656578fb1ef75fc65a0d8de7bcb3
│  │  │  └─ 877de92500aa7d9ee9df67e4bac7cab2d8bc9e
│  │  ├─ cd
│  │  │  └─ 720596e4e69c1bd6f599617ed1ae2abfb7d813
│  │  ├─ cf
│  │  │  └─ f6247a899543e1999e6b1f66229df1e6346183
│  │  ├─ d2
│  │  │  └─ bc4c2bdea0c2f7b156d1590da1af9b08078a68
│  │  ├─ d3
│  │  │  ├─ 253305aeaef3b0efdb119dfbcc3bd3e7f9b6f0
│  │  │  └─ e39e3ec796f79830f3650c725ccd1d46d9233b
│  │  ├─ d4
│  │  │  └─ 4d37503e1068a32ab70304148526acf8954963
│  │  ├─ d6
│  │  │  ├─ 80c647d7019c8fff0f77262bade7d30d58a2dd
│  │  │  └─ 9c5e3a4a67f068a947469879140c363b7e2773
│  │  ├─ d7
│  │  │  └─ ba84e69fff1a1680e5e75312f659f5ff720786
│  │  ├─ d8
│  │  │  └─ b036865f5f24a3e2f4e3b5fe37aa85bea17e82
│  │  ├─ d9
│  │  │  └─ cb8020bd56eae3b834e2c31da738bc07f9b985
│  │  ├─ db
│  │  │  ├─ 44b81641019d70f845ee745c375a67821b5313
│  │  │  ├─ 78fc96888c57faf32f493247d7d06b67eb6cdb
│  │  │  ├─ 91b05f1e73769d234cc89a42db0f20fa00c636
│  │  │  └─ e6e18b601aff5b150dba0a4b731e76d8886088
│  │  ├─ dc
│  │  │  └─ a723e09eaea29884547b8361c3769663b86be3
│  │  ├─ dd
│  │  │  └─ fd016730fab27924923ff82f1805f9300ac088
│  │  ├─ df
│  │  │  ├─ 50377b0aa80f2ea993267617954ac1864ceb49
│  │  │  └─ b0a08876a20d367c97d2318c29832bed955e8f
│  │  ├─ e0
│  │  │  └─ 7914fa5471e0a5ffe7ca67022bd6fef295b889
│  │  ├─ e1
│  │  │  └─ e9664a5f3013c7dfd6c5058c8ac051022e236a
│  │  ├─ e2
│  │  │  └─ 37685d9f1ab119abfe9f4dbf53830c325b32e2
│  │  ├─ e3
│  │  │  └─ 68f4b40b5340baf80358f12a65fce8cd2f4f62
│  │  ├─ e4
│  │  │  ├─ 461ce3d7fb4b6bdbf70142ddcd543542a9f499
│  │  │  └─ 80fe14d59a933917fe2883539ef0339ed7cb85
│  │  ├─ e5
│  │  │  └─ dc2230f2ada7e3a18b50ba0527a2888a034100
│  │  ├─ e6
│  │  │  └─ 34993fdc0f58b20540b0aea348aa6f412800f1
│  │  ├─ e7
│  │  │  ├─ 2d6ad6e71f6299431bd078a56e379307786c25
│  │  │  └─ bb9699918f6727de9568bca9c65b82d789a9b0
│  │  ├─ e9
│  │  │  └─ 90883ead9eb7c40a9e302c4241e893bbef33f8
│  │  ├─ ea
│  │  │  ├─ 093687d656ce51a4cff275af828f80550b0bd9
│  │  │  ├─ adc11e1d834accc19ef5fb7267c8004debfd50
│  │  │  └─ ae0455cc01b8068b980e7bb8ba0a4332de770d
│  │  ├─ eb
│  │  │  ├─ 0b0baf551dffec4c8620adf79848821645f78b
│  │  │  └─ 5706637cd8ac3bf6e3ea76ce30778c1af3e97f
│  │  ├─ ec
│  │  │  ├─ 2ef3c31637f17da4b0cc73f3f76e6c70a2fe1e
│  │  │  └─ e553239c6d03f67fe87b3c2c51e3c1ac8f8e9a
│  │  ├─ ef
│  │  │  ├─ 96e34dd80c74903e2bbca05030557e6b74d19f
│  │  │  └─ fe2c3b8fba7463d3c6a8ee634fb7606de0f8d5
│  │  ├─ f0
│  │  │  └─ bf593b7986a5a06d128f140a3f1b0c0d799459
│  │  ├─ f3
│  │  │  └─ 60bbde444d6dbda22a1bee7935dc22c3289214
│  │  ├─ f6
│  │  │  └─ fde6044ca9315f6ea36d79f36a2c24820b0e77
│  │  ├─ f7
│  │  │  ├─ 1ff2aebbf503f9108dcbff7e6ef1c5818ec6d9
│  │  │  ├─ 209f549c781bdd184f2c56441292ad63e938f4
│  │  │  └─ ef3bd1a1318edde0f127e58894a4a5e898856e
│  │  ├─ f8
│  │  │  ├─ 526b6185c37fc560dc435d4481c56441a6a0a1
│  │  │  └─ b272bd122aa3102843517b184c61179bb249b5
│  │  ├─ f9
│  │  │  ├─ 95dd94f6a393e59c4279649955bd7ad2703168
│  │  │  ├─ c7d06e395cfc9f39f2a2044c640666192fc575
│  │  │  └─ cf34c1ddbb9faee495c017f91c7c8b3004a3c2
│  │  ├─ fb
│  │  │  └─ 01be80c0763392b63ed44f32976bf10baeb706
│  │  ├─ fc
│  │  │  └─ d6eb48266c6949a106e5abe1f844dbaa1ac15c
│  │  ├─ fd
│  │  │  ├─ 6b03e6a320e83eacadb528bb7d754b077d8c49
│  │  │  ├─ 79949a59f2b35a7521ceb9b85493bd6198ff77
│  │  │  └─ cd284209694b3735f529f328ebd96aaacdbbd2
│  │  ├─ fe
│  │  │  └─ 900316730329ae5d5390b400dc854dcff86b13
│  │  ├─ info
│  │  └─ pack
│  ├─ refs
│  │  ├─ heads
│  │  │  ├─ master
│  │  │  ├─ pack4
│  │  │  └─ webpack_version
│  │  ├─ remotes
│  │  │  └─ origin
│  │  │     ├─ dependabot
│  │  │     │  └─ npm_and_yarn
│  │  │     │     ├─ acorn-5.7.4
│  │  │     │     ├─ js-yaml-3.13.1
│  │  │     │     ├─ lodash-4.17.15
│  │  │     │     ├─ lodash.template-4.5.0
│  │  │     │     ├─ mixin-deep-1.3.2
│  │  │     │     └─ webpack-dev-server-3.1.11
│  │  │     ├─ master
│  │  │     └─ pack4
│  │  └─ tags
│  └─ sourcetreeconfig
├─ .gitignore
├─ README.md
├─ common-conf-files
│  └─ .DS_Store
├─ config
│  ├─ build.js
│  ├─ mutipageConfig.js
│  ├─ set-dev-server.js
│  ├─ webpack.base.config.js
│  ├─ webpack.client.dev.config.js
│  ├─ webpack.client.prod.config.js
│  ├─ webpack.server.dev.config.js
│  └─ webpack.server.prod.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ server
│  ├─ cors.js
│  ├─ proxy.js
│  └─ server.js
└─ src
   ├─ .DS_Store
   ├─ api
   │  ├─ page1
   │  │  └─ index.js
   │  └─ page2
   │     └─ index.js
   ├─ common
   │  ├─ components
   │  │  ├─ Bar.vue
   │  │  └─ Foo.vue
   │  └─ utils
   │     ├─ auth.js
   │     ├─ platform.js
   │     ├─ request.js
   │     └─ util.js
   ├─ index.html
   ├─ pages
   │  ├─ .DS_Store
   │  ├─ page1
   │  │  ├─ App.vue
   │  │  ├─ app.js
   │  │  ├─ entry-client.js
   │  │  ├─ entry-server.js
   │  │  ├─ imgs
   │  │  │  └─ img_bg.png
   │  │  ├─ router
   │  │  │  └─ index.js
   │  │  └─ views
   │  │     ├─ index.vue
   │  │     ├─ test1.vue
   │  │     └─ test2.vue
   │  ├─ page2
   │  │  ├─ App.vue
   │  │  ├─ app.js
   │  │  ├─ entry-client.js
   │  │  └─ entry-server.js
   │  └─ page3
   │     ├─ App.vue
   │     ├─ app.js
   │     ├─ entry-client.js
   │     └─ entry-server.js
   └─ store
      └─ store.js

```