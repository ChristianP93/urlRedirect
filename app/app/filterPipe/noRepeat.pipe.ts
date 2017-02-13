import {Pipe, PipeTransform} from '@angular/core';

import 'rxjs/add/operator/map';

@Pipe({
    name: 'noRepeat',
    pure: false
})

export class NoRepeatPipe implements PipeTransform {
    transform(miao: any[]): any {
        let filter: any[] = [];
        // filter.indexOf(miao) > -1 ? miao.splice(filter.indexOf(miao), 1):
        miao.map((index) => {
            console.log(filter.indexOf('user123654') > -1);
            console.log(index);
            return filter.indexOf(index) > -1 ? null : filter.push(index);
        });
        console.log(filter)
        return filter
        // let result: any[] = [];
        // return filter ? value.filter((movie: any) => movie.title.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
