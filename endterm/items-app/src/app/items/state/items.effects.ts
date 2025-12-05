import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemsActions from './items.actions';
import { ItemsService } from '../../services/items';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Item } from '../../services/item.model';

@Injectable()
export class ItemsEffects {

  private actions$ = inject(Actions);
  private itemsService = inject(ItemsService);

  // ===== LIST =====
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(action =>
        this.itemsService.getItems(action.query).pipe(
          map((items: Item[]) =>
            ItemsActions.loadItemsSuccess({ items })
          ),
          catchError(error =>
            of(ItemsActions.loadItemsFailure({ error }))
          )
        )
      )
    )
  );

  // ===== SINGLE ITEM (details) =====
  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItem),
      switchMap(action =>
        this.itemsService.getItem(action.id).pipe(
          map((item: Item) =>
            ItemsActions.loadItemSuccess({ item })
          ),
          catchError(error =>
            of(ItemsActions.loadItemFailure({ error }))
          )
        )
      )
    )
  );
}