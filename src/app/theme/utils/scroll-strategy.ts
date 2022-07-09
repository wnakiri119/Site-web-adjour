import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';

export function menuScrollStrategy(overlay: Overlay): () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}
