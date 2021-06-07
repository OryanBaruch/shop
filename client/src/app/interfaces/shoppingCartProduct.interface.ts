export default interface shoppingCart_Products_Interface{
    length: any;
    name: any;
    shoppingCartProducts: any;
    filter?(arg0: (item: any) => boolean);
    push?(res: any);
    amount?:number
    category?:string
    photo_url?:string
    price?:number,
    _id?:string,
    product?:any
}