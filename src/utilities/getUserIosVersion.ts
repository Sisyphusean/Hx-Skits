export const iOSVersion = parseFloat(
    ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
      .replace('undefined', '3_2').replace('_', '.').replace('_', '')
  ) || false;