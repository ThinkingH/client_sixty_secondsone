#import "PLVideoViewManager.h"
#import <React/RCTBridge.h>
#import <AVFoundation/AVFoundation.h>

@implementation PLVideoViewManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[PLVideoView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);
RCT_EXPORT_VIEW_PROPERTY(loop, BOOL);
RCT_EXPORT_VIEW_PROPERTY(seek, float);
RCT_EXPORT_VIEW_PROPERTY(volume, float);
//RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL);
RCT_EXPORT_VIEW_PROPERTY(videoPath, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(relese, BOOL);



RCT_EXPORT_VIEW_PROPERTY(onLoading, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onReady, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPaused, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onStop, RCTBubblingEventBlock);
//RCT_EXPORT_VIEW_PROPERTY(onError, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPlaying, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAutoReconnecting, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onCompleted, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onProg, RCTBubblingEventBlock);

@end
