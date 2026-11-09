PORTNAME=	seerr
DISTVERSION=	3.5.1
CATEGORIES=	net-p2p
LICENSE= MIT
GH_ACCOUNT= seerr-team
DISTVERSIONPREFIX=      v

MAINTAINER=	nathan@nzm.ca
COMMENT=	Seerr is a free and open source software application for managing requests for your media library.
WWW=		https://seerr.dev/

BUILD_DEPENDS= npm-node22>0:www/npm-node22 \
	node22>0:www/node22 \
	jq>0:textproc/jq \
	libuv>0:devel/libuv \
	sqlite3>0:databases/sqlite3 \
	python3>0:lang/python3 \
	py312-setuptools>0:devel/py-setuptools \
	gmake>0:devel/gmake


USES= localbase nodejs:22,build,run pkgconfig python:build #shebangfix
SHEBANGFIX_FILES= www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/test_gyp.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/easy_xml_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/win_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/generator/msvs_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/input_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/mac_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/__init__.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/MSVSSettings_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/common_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/pylib/gyp/flock_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/gyp_main.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/tools/graphviz.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/tools/pretty_vcproj.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/tools/pretty_gyp.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/tools/pretty_sln.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/gyp_main.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/test_gyp.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/flock_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/input_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/win_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/generator/msvs_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/easy_xml_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/MSVSSettings_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/common_test.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/__init__.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/gyp/pylib/gyp/mac_tool.py \
		 www/seerr/node_modules/.pnpm/node-gyp@8.4.1/node_modules/node-gyp/update-gyp.py

RUN_DEPENDS=    ca_root_nss>0:security/ca_root_nss \
	node22>0:www/node22 \
	npm-node22>0:www/npm-node22 \
	vips>0:graphics/vips

USERS= www
GROUPS= www

USE_GITHUB= yes
PNPM=           ${WRKDIR}/pnpm-prefix/bin/pnpm
PNPM_VERSION= 11.27.1

MAKE_ENV= CI=1  \
	  COREPACK_ENABLE_STRICT=0 \
	  HOME=${WRKDIR} \
	  NODE_OPTIONS="--max-old-space-size=4096"  \
	  npm_config_cflags=-I/usr/local/include \
	  npm_config_build_from_source=true \
	  npm_config_nodedir=${LOCALBASE} \
	  CPPFLAGS=-I${LOCALBASE}/include \
	  SHARP_FORCE_GLOBAL_LIBVIPS=1 

PORTDATA= node_modules .next dist seerr-api.yml package.json

pre-build: 
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} corepack enable 

do-build:                                                                                                                               
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} CYPRESS_INSTALL_BINARY=0 pnpm install --prod --frozen-lockfile --ignore-scripts && \
		${SETENV} ${MAKE_ENV} pnpm rebuild sqlite3 bcrypt
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} bash -x ${FILESDIR}/setup-next-wasm.sh && \
		${SETENV} ${MAKE_ENV} node ${FILESDIR}/fix-svgr.js next.config.ts
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node_modules/.bin/next build --webpack && \
		${SETENV} ${MAKE_ENV} pnpm build:server
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node ${FILESDIR}/fix-db.js

pre-install:
	${FIND} ${WRKSRC}/node_modules \( -name test -o -name tests -o -name '*.md' -o -name '*.map' \) -prune -exec ${RM} -r {} +
	${FIND} ${WRKSRC}/node_modules -path '*/prebuilds/*' -prune -exec ${RM} -r {} +

do-install:
	${MKDIR} ${STAGEDIR}/var/db/seerr \
		${STAGEDIR}${DATADIR} \
		${STAGEDIR}${LOCALBASE}/libexec \
		${STAGEDIR}${LOCALBASE}/etc/rc.d
	cd ${WRKSRC} && ${COPYTREE_SHARE} "dist .next seerr-api.yml node_modules package.json" ${STAGEDIR}${DATADIR}
	${INSTALL_SCRIPT} ${FILESDIR}/seerr-bin ${STAGEDIR}${LOCALBASE}/libexec/seerr
	${INSTALL_SCRIPT} ${FILESDIR}/seerr-daemon ${STAGEDIR}${LOCALBASE}/etc/rc.d/seerr

.include <bsd.port.mk>
