/**
 * Google reCAPTCHA v3 (invisible) helper.
 *
 * Fail-open by design: if the site key isn't configured, or the script
 * fails to load, or execution throws for any reason, this resolves to
 * `null` instead of throwing — callers should never block a form submit
 * because reCAPTCHA isn't available.
 *
 * vue-cli only exposes env vars prefixed `VUE_APP_` to client code, so the
 * site key must be set as `VUE_APP_RECAPTCHA_SITE_KEY` (not `VITE_*`).
 */

let loadPromise = null;

function loadRecaptchaScript(key) {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Get a reCAPTCHA v3 token for the given action.
 * Returns `null` if reCAPTCHA is not configured or anything goes wrong.
 * @param {string} action
 * @returns {Promise<string|null>}
 */
export async function getRecaptchaToken(action) {
  const key = process.env.VUE_APP_RECAPTCHA_SITE_KEY;

  if (!key) {
    return null;
  }

  try {
    const grecaptcha = await loadRecaptchaScript(key);

    await new Promise((resolve) => grecaptcha.ready(resolve));

    return await grecaptcha.execute(key, { action });
  } catch (e) {
    return null;
  }
}
