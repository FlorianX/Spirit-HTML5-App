package org.unsane.spiritHtml5App;

import com.google.android.apps.analytics.GoogleAnalyticsTracker;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class SpiritHtml5AppActivity extends Activity {
	
	GoogleAnalyticsTracker tracker;
	WebView webView;
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        tracker = GoogleAnalyticsTracker.getInstance();

        // Start the tracker in manual dispatch mode...
        tracker.startNewSession("UA-20869340-1", 5, this);
        
        setContentView(R.layout.main);
        /**
         * @see http://www.youtube.com/watch?v=uVqp1zcMfbE
         */
        // create a webView
        webView = (WebView)findViewById(R.id.webView);

        // enable some settings
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        // use the WebChromeClient
        webView.setWebChromeClient(new WebChromeClient());

        // load the html files
        webView.loadUrl("file:///android_asset/www/index.html");
        tracker.trackPageView("/SpiritHtml5App");
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //Stop the tracker when it is no longer needed.
        tracker.stopSession();
    }
    
    @Override
    public void onResume() {
        super.onResume();
        tracker.trackPageView("/SpiritHtml5App");
    }
}