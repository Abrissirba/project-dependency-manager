import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class OnDestroyComponent implements OnDestroy {
    destroy = new Subject();
    
    get takeUntilDestroyed() {
        return takeUntil(this.destroy);
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}