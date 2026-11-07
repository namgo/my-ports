PORTNAME=	seerr
DISTVERSION=	3.5.1
CATEGORIES=	net-p2p
LICENSE= MIT
#MASTER_SITES=	https://github.com/seerr-team/seerr/archive/refs/tags/v${DISTVERSION}.tar.gz
GH_ACCOUNT= seerr-team
DISTVERSIONPREFIX=      v

MAINTAINER=	nathan@nzm.ca
COMMENT=	Seerr is a free and open source software application for managing requests for your media library.
WWW=		https://seerr.dev/

BUILD_DEPENDS= npm-node22>0:www/npm-node22 \
	node22>0:www/node22 \
	jq>0:textproc/jq

USES= shebangfix
SHEBANFIX_FILES= www/seerr/node_modules/.pnpm/node-gyp@12.2.0/node_modules/node-gyp/gyp/test_gyp.py \
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
#sqlite3>0:databases/sqlite3 \
#gmake>0:devel/gmake

USERS= seerr
GROUPS= seerr

#PNPM=           ${WRKDIR}/pnpm-prefix/bin/pnpm
#PNPM_VERSION=   11.27.1
USE_GITHUB= yes

MAKE_ENV=       CI=1 \
	COREPACK_ENABLE_STRICT=0 \
	CYPRESS_INSTALL_BINARY=0 \
	HOME=${WRKDIR} \
	CPPFLAGS=-I/usr/local/include \
	NODE_OPTIONS=--max-old-space-size=4096 \
	npm_config_build_from_source=true \
	npm_config_nodedir=${LOCALBASE} \
	SHARP_FORCE_GLOBAL_LIBVIPS=1 

do-build:                                                                                                                               
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm install --prod --frozen-lockfile --ignore-scripts
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm rebuild sqlite3 bcrypt
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} bash -x ${FILESDIR}/setup-next-wasm.sh
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node ${FILESDIR}/fix-svgr.js next.config.ts 
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node_modules/.bin/next build --webpack
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm build:server
	cd ${WRKSRC} && node -e "let f='./dist/datasource.js',s=require('fs').readFileSync(f,'utf8');require('fs').writeFileSync(f,s.replace('synchronize: false','synchronize: true'))" 
	cd ${WRKSRC} && node -e "let f='./dist/index.js',s=require('fs').readFileSync(f,'utf8');require('fs').writeFileSync(f,s.replace(/(PRAGMA foreign_keys=OFF'\);\s*)await dbConnection\.runMigrations\(\)/,'\$1/* migrations handled by synchronize */'))" 

do-install:
	${MKDIR} ${STAGEDIR}${WWWDIR} \
		${STAGEDDIR}${PREFIX}/var/log/seerr \
		${STAGEDDIR}${PREFIX}/var/db/seerr
	cd ${WRKSRC} && ${PAX} -rw . ${STAGEDIR}${WWWDIR}/

.include <bsd.port.mk>
