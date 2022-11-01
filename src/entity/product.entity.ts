import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"product"})
export class Product{
    @PrimaryGeneratedColumn()
    
    @PrimaryColumn('int')
    sku!:number
    
    @Column('varchar',{length:200})
    name!:string
    
    @Column('varchar',{length:100})
    type!:string
    
    @Column('double')
    price!:number
    
    @Column('varchar',{length:100})
    upc!:string

    @Column('simple-json',{nullable:true})
    category!:{
        id:string,
        name:string
    }[]
    
    @Column('double')
    shipping!:number
        
    @Column('text')
    desciption!:string

    @Column('varchar',{length:200})
    manufacturer!:string

    @Column('varchar',{length:200})
    model!:string
    
    @Column('varchar',{length:200})
    url!:string

    @Column('varchar',{length:200})
    image!:string
    
}