//
//  PLVideoView.m
//  sixty_seconds
//
//  Created by aj on 2017/12/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import "PLVideoView.h"

#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>
//#import "RCTEventEmitter.h"

@implementation PLVideoView{
  RCTEventDispatcher *_eventDispatcher;
  PLPlayer *_plplayer;
  BOOL _started;
  BOOL _muted;
  BOOL _islive;
  BOOL _autoPlay;
  BOOL _loop;
  BOOL _first;
  BOOL _isSeeking;
  NSTimer *_timer;
  //CMTime _currentTime;
}
static NSString *status[] = {
  @"PLPlayerStatusUnknow",
  @"PLPlayerStatusPreparing",
  @"PLPlayerStatusReady",
  @"PLPlayerStatusCaching",
  @"PLPlayerStatusPlaying",
  @"PLPlayerStatusPaused",
  @"PLPlayerStatusStopped",
  @"PLPlayerStatusError",
  @"PLPlayerStatusCompleted"
};


- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super init])) {
    _eventDispatcher = eventDispatcher;
    _started = YES;
    _muted = NO;
    _loop = NO;
    _timer = nil;
    _first = YES;
    _isSeeking=NO;
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:nil];
    self.reconnectCount = 0;
  }
  return self;
};
- (void) setSource:(NSDictionary *)source
{
  NSString *url = source[@"url"];
  
  if (url == nil || url == NULL || [url isEqualToString:@""]) {
    return;
  }
  
  NSString *loop=source[@"loop"];
  if(loop==nil||loop==NULL|| [url isEqualToString:@"false"]){
     _loop=NO;
  }else{
    _loop=YES;
  }
  
  bool backgroundPlay = source[@"backgroundPlay"] == nil ? false : source[@"backgroundPlay"];
  PLPlayerOption *option = [PLPlayerOption defaultOption];
  
  NSString *coverurl=source[@"coverurl"];
  
  // 更改需要修改的 option 属性键所对应的值
  [option setOptionValue:@15 forKey:PLPlayerOptionKeyTimeoutIntervalForMediaPackets];
  
  if(_plplayer){
    [_plplayer stop]; //TODO View 被卸载时 也要调用
  }
  
  _plplayer = [PLPlayer playerWithURL:[[NSURL alloc] initWithString:url] option:option];
  
  _plplayer.delegate = self;
  _plplayer.delegateQueue = dispatch_get_main_queue();
  _plplayer.backgroundPlayEnable = backgroundPlay;
  
  if(backgroundPlay){
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(startPlayer) name:UIApplicationWillEnterForegroundNotification object:nil];
  }
  //[_plplayer addObserver:self forKeyPath:@"currentTime" options:(NSKeyValueObservingOptionNew|NSKeyValueObservingOptionOld) context:nil];
  
  
  [self setupUI];
  
  if(coverurl!=nil){
    NSURL *imageUrl = [NSURL URLWithString:coverurl];
    UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:imageUrl]];
   
    _plplayer.launchView.contentMode =  UIViewContentModeScaleAspectFit;
    _plplayer.launchView.image=image;
  }
  
  //_plplayer.launchView.backgroundColor = [UIColor blueColor];
  _plplayer.playerView.frame = [self frame];
  //CGRectMake(100, 100, 100, 100);
  
  [self startPlayer];
  
}

- (void)setupUI {
  if (_plplayer.status != PLPlayerStatusError) {
    // add player view
    UIView *playerView = _plplayer.playerView;
    [self addSubview:playerView];
    [playerView setTranslatesAutoresizingMaskIntoConstraints:NO];
    
    NSLayoutConstraint *centerX = [NSLayoutConstraint constraintWithItem:playerView attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeCenterX multiplier:1.0 constant:0];
    NSLayoutConstraint *centerY = [NSLayoutConstraint constraintWithItem:playerView attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeCenterY multiplier:1.0 constant:0];
    NSLayoutConstraint *width = [NSLayoutConstraint constraintWithItem:playerView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeWidth multiplier:1.0 constant:0];
    NSLayoutConstraint *height = [NSLayoutConstraint constraintWithItem:playerView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeHeight multiplier:1.0 constant:0];
    
    NSArray *constraints = [NSArray arrayWithObjects:centerX, centerY,width,height, nil];
    
    [self addConstraints: constraints];
  }
      
}

//----------------------------
- (void)setPath:(NSDictionary *) videoPath {
  NSString *url = videoPath[@"url"];
  NSString *imageurl = videoPath[@"iamgeurl"];
  
  if (url == nil || url == NULL || [url isEqualToString:@""]) {
    return;
  }
  
  
  if(_plplayer){
    [_plplayer stop];
  }
  
  if(imageurl!=nil){
    //设置 封面图
  } 
  
  _plplayer = [PLPlayer playerWithURL:[[NSURL alloc] initWithString:url] option:nil];
  [self startPlayer];
}

-(void) setRelese:(BOOL) relese;{
  if(_plplayer){
    [_plplayer stop]; //TODO View 被卸载时 也要调用
  }
  [_timer invalidate];
  _timer  = nil;
}

//----------------------------

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}
- (void) setMuted:(BOOL) muted {
  _muted = muted;
  [_plplayer setMute:muted];
  
}
- (void) setVolume:(float) volume{
  [_plplayer setVolume:volume];
}
- (void)startPlayer {
  [UIApplication sharedApplication].idleTimerDisabled = YES;
  //NSLog(@"布尔值3:%i",_autoPlay);
  [_plplayer play];
  _started = true;
  //NSLog(@"布尔值:%i",_started);
  [self startProcess];
}
/** --------------- 播放进度的timer ----------------- */
- (void)startProcess {
  if (!_timer) {
    //NSLog(@"布尔值:%i",_started);
    _timer = [NSTimer scheduledTimerWithTimeInterval:1.f target:self selector:@selector(timerFunction:) userInfo:nil repeats:YES];
  }
}

- (void) endProcess {
  [_timer invalidate];
  _timer  = nil;
}
- (void)timerFunction:(NSTimer *) state {
  //NSLog(@"布尔值2:%i",_started);
  if(_plplayer.playing && self.onProg){
    self.onProg(@{@"currentTime":[NSNumber numberWithDouble:CMTimeGetSeconds(_plplayer.currentTime)],@"totalTime":[NSNumber numberWithDouble:CMTimeGetSeconds(_plplayer.totalDuration)]});
  }
  //NSLog(@"TIME:%f",currentTime);
}

/** --------------- 播放进度的timer ----------------- */

#pragma mark - <PLPlayerDelegate>

- (void)player:(nonnull PLPlayer *)player statusDidChange:(PLPlayerStatus)state {
  switch (state) {
    case PLPlayerStatusCaching:
      self.onLoading(@{@"target": self.reactTag});
      //[_eventDispatcher sendInputEventWithName:@"onLoading" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusReady:
      self.onReady(@{@"target": self.reactTag,@"duration":[NSNumber numberWithDouble:CMTimeGetSeconds(_plplayer.totalDuration)]});
      //[_eventDispatcher sendInputEventWithName:@"onReady" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusPlaying:
      self.onPlaying(@{@"target": self.reactTag});
      //[_eventDispatcher sendInputEventWithName:@"onPlaying" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusPaused:
      self.onPaused(@{@"target": self.reactTag});
      //[_eventDispatcher sendInputEventWithName:@"onPaused" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusStopped:
      self.onStop(@{@"target": self.reactTag});
      //[_eventDispatcher sendInputEventWithName:@"onShutdown" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusError:
      //self.onError(@{@"target": self.reactTag,@"errorCode": [NSNumber numberWithUnsignedInt:0]});
      //[_eventDispatcher sendInputEventWithName:@"onError" body:@{@"target": self.reactTag , @"errorCode": [NSNumber numberWithUnsignedInt:0]}];
      break;
    case PLPlayerStateAutoReconnecting:
      self.onAutoReconnecting(@{@"target": self.reactTag});
      //[_eventDispatcher sendInputEventWithName:@"onAutoReconnecting" body:@{@"target": self.reactTag}];
      break;
    case PLPlayerStatusCompleted:
      if(_loop){
        [_plplayer stop];
        [_plplayer play];
        _started=true;
      }else{
        if(self.onCompleted){
          self.onCompleted(@{@"target": self.reactTag});
          self.onProg(@{@"currentTime":[NSNumber numberWithDouble:CMTimeGetSeconds(_plplayer.totalDuration)],@"totalTime":[NSNumber numberWithDouble:CMTimeGetSeconds(_plplayer.totalDuration)]});
        }
        [_plplayer pause];
        _started = false;
      }
      break;
    default:
      break;
  }
  NSLog(@"%@", status[state]);
}

- (void)setSeek:(float) seek{
  double ctime = CMTimeGetSeconds(_plplayer.totalDuration) * seek;
  CMTimeScale scale =_plplayer.currentTime.timescale;
  CMTime cmtime =CMTimeMake(ctime * scale, scale);
  [_plplayer seekTo:cmtime];
  //_isSeeking=NO;
}

-(void) setLoop:(BOOL)loop{
  //NSLog(@"loop:%i",loop);
  _loop = loop;
}
- (void) setPaused:(BOOL) paused{
  NSLog(@"ssssssss:%i",paused);
  if(_first){
    paused=false;
    _first=false;
    return;
  }
  if(!paused){
    [_plplayer resume];
    _started = paused;
    [self startProcess];
  }else{
    [_plplayer pause];
    _started = paused;
    [self endProcess];
  } 
}

- (void)player:(nonnull PLPlayer *)player stoppedWithError:(nullable NSError *)error {
  [self tryReconnect:error];
}

- (void)tryReconnect:(nullable NSError *)error {
  if (self.reconnectCount < 3) {
    _reconnectCount ++;
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"错误" message:[NSString stringWithFormat:@"错误 %@，播放器将在%.1f秒后进行第 %d 次重连", error.localizedDescription,0.5 * pow(2, self.reconnectCount - 1), _reconnectCount] delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
//    [alert show];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * pow(2, self.reconnectCount) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [_plplayer play];
    });
  }else {
    [UIApplication sharedApplication].idleTimerDisabled = NO;
    NSLog(@"%@", error);
  }
}

@end