import {Page} from '../core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '../redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {normalizeInitState} from '../redux/initialState';
export class ExcelPage extends Page {
  getRoot() {
    console.log('this params', this.params)
    const storageName = `excel:${this.params || Date.now().toString()}`
    const state = storage(storageName)
    const store = createStore(rootReducer, normalizeInitState(state))

    const stateSubscriber = debounce(state => {
      storage(storageName, state)
    }, 300)

    store.subscribe(stateSubscriber)
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
