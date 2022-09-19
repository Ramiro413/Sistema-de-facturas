import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'data',
})  

export class DataPipe implements PipeTransform{
    transform(values: number): string{
            let result= "";
           if(values == 1){
            result = "Adquisición de mercancía."
           }
           if(values == 2){
            result = "Gastos en general."
           }
           if(values == 3){
            result = "Equipo de transporte."
           }
           if(values == 4){
            result = "Otra maquinaría y equipo."
           }
           return result;

        }
    
}