import 'dart:ui';

import 'package:flame/game/game.dart';
import 'package:flame/util.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() async {
  /// Create the main game and insert into the game loop.
  BoxGame game = BoxGame();

  TapGestureRecognizer tapper = TapGestureRecognizer();
  tapper.onTapDown = game.onTapDown;

  runApp(game.widget);

  /// Set the screen to full screen and fix the orientation.
  Util flameUtil = Util();
  await flameUtil.fullScreen();
  await flameUtil.setOrientation(DeviceOrientation.portraitUp);
}

class BoxGame extends Game {
  Size screenSize;
  @override
  void render(Canvas canvas) {
    /// Draw background
    Rect bgRect = Rect.fromLTWH(0, 0, screenSize.width, screenSize.height);
    Paint bgPaint = Paint();
    bgPaint.color = Colors.red;
    canvas.drawRect(bgRect, bgPaint);

    /// Draw Rectangle
    double screenCenterX = screenSize.width / 2;
    double screenCenterY = screenSize.height / 2;
    Rect boxRect =
        Rect.fromLTWH(screenCenterX - 75, screenCenterY - 75, 150, 150);
    Paint boxPaint = Paint();
    boxPaint.color = Colors.blueAccent;
    canvas.drawRect(boxRect, boxPaint);
  }

  @override
  void update(double t) {
    // TODO: implement update
  }
  void resize(Size size) {
    screenSize = size;
    print(size);
    super.resize(size);
  }

  void onTapDown(TapDownDetails tapDownDetails) {
    print("game over if clicked on the boxx");
  }
}
