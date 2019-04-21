const log = {
  success: 'padding:0.6em 0; color:#27b376;',
  info: 'padding:0.6em 0; color:#3B5998;',
  error: 'padding:0.6em 0; color:#bf212f;'
};

const defaultLocale = 'en_us';

function fetchFbSdk(options) {
  const locale = options.locale ? options.locale : defaultLocale;
  return new Promise((resolve, reject) => {
(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/' + locale + '/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = function() {
        console.log('%cVueFbCustomerchat:: loaded', log.info);
        resolve();
      };
      js.onerror = function() {
        reject();
        console.error('%cVueFbCustomerchat:: NOT loaded', log.error);
      };
    })(document, 'script', 'facebook-jssdk');
  })
}

function initFbSdk(options) {
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      const defaults = { cookie: true, xfbml: true, version: 'v3.0' };
      options = { ...defaults, ...options };
      window.FB.init(options);
      resolve();
    };
  })
}

function getFbSdk(options) {
  return new Promise(resolve => {
    if (window.FB) {
      resolve(window.FB);
    } else {
      fetchFbSdk(options).then(() => {
        initFbSdk(options).then(() => {
          resolve(window.FB);
        });
      });
    }
  })
}

const VueFbCustomerchat = {
  install: (Vue, options) => {
    Vue.mixin({
      mounted() {
        console.log('Hello from created hook!');
      }
    });

    getFbSdk(options).then(() => {
      if (options.page_id) {
        // // events to emit
        // FB.Event.subscribe('customerchat.load', () => console.log('customerchat.load'));
        // FB.Event.subscribe('customerchat.show', () => console.log('customerchat.show'));
        // FB.Event.subscribe('customerchat.hide', () => console.log('customerchat.hide'));
        // FB.Event.subscribe('customerchat.dialogShow', () => console.log('customerchat.dialogShow'));
        // FB.Event.subscribe('customerchat.dialogHide', () => console.log('customerchat.dialogHide'));
        // // triggers
        // FB.CustomerChat.show(shouldShowDialog: boolean);
        // FB.CustomerChat.hide();
        // FB.CustomerChat.hideDialog();
        // FB.CustomerChat.showDialog();

        const elem = document.createElement('div');
        elem.setAttribute('class', 'fb-customerchat');
        elem.setAttribute('attribution', 'setup_tool');

        // set attributes
        Object.entries(options).forEach(attr => {
          elem.setAttribute(attr[0], attr[1]);
        });

        document.body.appendChild(elem);
      } else {
        console.error(
          '%cVueFbCustomerchat:: You have to specify `pageId`',
          log.error
        );
      }
    });
  }
};

export default VueFbCustomerchat;
