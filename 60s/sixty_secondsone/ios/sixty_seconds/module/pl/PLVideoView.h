//
//  PLVideoView.h
//  sixty_seconds
//
//  Created by aj on 2017/12/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import "PLPlayer.h"
#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@class RCTEventDispatcher;

@interface PLVideoView : UIView<PLPlayerDelegate>

@property (nonatomic, assign) int reconnectCount;
//@property(nonatomic,strong) NSTimer *timer;
@property(nonatomic,assign) bool loop;
//@property(nonatomic,assign) bool autoPlay;


@property (nonatomic, copy) RCTBubblingEventBlock onLoading;
@property (nonatomic, copy) RCTBubblingEventBlock onReady;

@property (nonatomic, copy) RCTBubblingEventBlock onPlaying;
@property (nonatomic, copy) RCTBubblingEventBlock onPaused;
@property (nonatomic, copy) RCTBubblingEventBlock onStop;
//@property (nonatomic, copy) RCTBubblingEventBlock onError;
@property (nonatomic, copy) RCTBubblingEventBlock onAutoReconnecting;

@property (nonatomic, copy) RCTBubblingEventBlock onCompleted;

@property (nonatomic, copy) RCTBubblingEventBlock onProg;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;


@end

