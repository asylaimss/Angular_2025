import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemsActions from './items.actions';
import { ItemsService } from '../../services/items';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(({ query }) =>
        this.itemsService.getItems(query).pipe(
          map((items) => ItemsActions.loadItemsSuccess({ items })),
          catchError((err) =>
            of(
              ItemsActions.loadItemsFailure({
                error: err.message || 'Failed to load items',
              })
            )
          )
        )
      )
    )
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItem),
      mergeMap(({ id }) =>
        this.itemsService.getItemById(id).pipe(
          map((item) => ItemsActions.loadItemSuccess({ item })),
          catchError((err) =>
            of(
              ItemsActions.loadItemFailure({
                error: err.message || 'Failed to load item',
              })
            )
          )
        )
      )
    )
  );
}
