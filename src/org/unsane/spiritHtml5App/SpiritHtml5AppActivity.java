package org.unsane.spiritHtml5App;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class SpiritHtml5AppActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        /**
         * @see http://www.youtube.com/watch?v=uVqp1zcMfbE
         */
        // create a webView
        WebView webView = (WebView)findViewById(R.id.webView);

        // enable some settings
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        // use the WebChromeClient
        webView.setWebChromeClient(new WebChromeClient());
        
        // load the html files
        webView.loadUrl("file:///android_asset/www/index.html");
    }
}