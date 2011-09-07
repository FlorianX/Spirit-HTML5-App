package org.unsane.spiritHtml5App;

import com.google.android.apps.analytics.GoogleAnalyticsTracker;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class SpiritHtml5AppActivity extends Activity {
	
	GoogleAnalyticsTracker tracker;
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        tracker = GoogleAnalyticsTracker.getInstance();

        // Start the tracker in manual dispatch mode...
        tracker.startNewSession("UA-20869150-2", 5, this);
        
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
        tracker.trackPageView("/SpiritHtml5App");
    }
    
    @Override
    protected void onDestroy() {
      super.onDestroy();
      // Stop the tracker when it is no longer needed.
      tracker.stopSession();
    }
    
    @Override
    public void onResume() {
  	  tracker.trackPageView("/SpiritHtml5AppResumed");
  	  super.onResume();
  	}
}