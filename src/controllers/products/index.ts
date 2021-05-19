import { Router } from 'express';
import { Types } from 'mongoose';
import { makeResponse } from '../../lib';
import products from '../../models/products'
import { deleteProduct, getProduct, editProduct, setProduct } from '../../services/products';
const router = Router();
router.post('/create-product', async (req, res) => {
   let product: any = await setProduct({
      _id: new Types.ObjectId(),
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      catagoryname: req.body.catagoryname
   });
   return (makeResponse(res, 200, true, 'Product Created', (product)));
});
router.get('/list-product/:type', async (req, res) => {
   let pro: any = await getProduct(req.params.type)
   return (makeResponse(res, 200, true, 'Product Displayed', { pro }));
});
router.put('/edit-product/:id', async (req, res) => {
   //   let pr: any = await editProduct(req.params.id,{  title:req.body.title,
   //    image:req.body.image,
   //    description:req.body.descrition,
   //    price:req.body.price,
   //    catagoryname:req.body.catagoryname})
   let pr: any = await products.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
         title: req.body.title,
         image: req.body.image,
         description: req.body.descrition,
         price: req.body.price,
         catagoryname: req.body.catagoryname
      }
   }, { new: true });
   return (makeResponse(res, 200, true, 'Product Updated', { pr }));
});
router.delete('/delete-product/:id', async (req, res) => {
   let p: any = await deleteProduct(req.params.id)
   return (makeResponse(res, 200, true, 'Product Deleted', { p }));
});

export const productController = router;



// var a=products.insertMany(
//    [
//        {
//                _id:new mongoose.Types.ObjectId(),
//                title: "Black Jacket",
//                image: '../tyler-nix-3OG8ywzgjJY-unsplash.jpg',
//                description: 'Pure Black Lether Jacket',
//                price: 360,
//                catagoryname:"men"
//            },
//            {
//                _id:new mongoose.Types.ObjectId(),
//                title: "White T-Shirt",
//                image:"../dewang-gupta-Ti3t6Vid6oM-unsplash.jpg",
//                description: "White Cotton Half T-Shirt",
//                price: 300,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//                title: "'Navy Blue Shirt'",
//                image: "'../andreea-pop-12zefBEZMvg-unsplash.jpg'",
//                description: "'Navy Blue Denim Shirt'",
//                price: 360,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//                title: "'Checked Shirt'",
//                image: "'../sincerely-media-by3bSk3G1P8-unsplash.jpg'",
//                description: "'Pure Cotton Stuffed Checked Shirt'",
//                price: 360,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//               title: "Black T-Shirt'",
//                image: "'../creaslim-BK4DswauUmo-unsplash.jpg'",
//                description: "'Black Round Neck T-Shirt'",
//                price: 360,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Black T-Shirt',
//                image: '../silviu-beniamin-tofan-wCjdgOQY8iY-unsplash.jpg',
//                description: 'Black Round Neck T-Shirt',
//                price: 360,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Black Wollen Jacket',
//                image: '../erik-mclean-VsxZziZzbLY-unsplash.jpg',
//                description: 'Dark Black Wollen Jacket',
//                price: 360,
//                catagoryname:"men"
//            },
//            { 
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Black Shirt',
//                image: '../pedram-normohamadian-EtbWtewRQJs-unsplash.jpg',
//                description: 'Black Formal Shirt',
//                price: 360,
//                catagoryname:"men"
//            },
//            {
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Blazer',
//                image: '../etty-fidele-AzVexpHvuKY-unsplash.jpg',
//                description: 'Plain Orange Color Blazer',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Round Neck T-Shirt',
//                image: '../junior-moran-SYlzcTAwTWE-unsplash.jpg',
//                description: 'Printed Round Neck T-Shirt In Orange Color',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Crop Top',
//                image: '../laura-chouette-enQcrUMOp_U-unsplash.jpg',
//                description: 'PLain Crop Top For Women',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'White Gown',
//                image: '../laura-chouette-MSDzTRbypMM-unsplash.jpg',
//                description: 'Plain White Gown For Marriage',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Blazer',
//                image: '../laura-chouette-t5Zpa8s32JU-unsplash.jpg',
//                description: 'Plain Women Long Jacket',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Crop Top In Black',
//                image: '../kitera-dent-Dpnrop8vb7k-unsplash.jpg',
//                description: 'Plain Balck Crop Top For Women',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Cream Jacket',
//                image: '../laura-chouette-d7wSG9uPev4-unsplash.jpg',
//                description: 'Plain Cream Long Jacket',
//                price: '360',
//                catagoryname:"women"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Wollen Jacket',
//                image: '../laura-chouette-W6N869esmYM-unsplash.jpg',
//                description: 'Wollen Long Jacket',
//                price: '360',
//                catagoryname:"women"
//            },
//            {
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Yellow Jacket',
//                image: '../daiga-ellaby-JZ51o_-UOY8-unsplash.jpg',
//                description: 'Yellow Wollen Jacket',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Sky Blue T-shirt',
//                image: '../guillaume-de-germain-fgmLRBlUIpc-unsplash.jpg',
//                description: 'Sky Blue Rounded T-Shirt',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Pink Hoddie',
//                image: '../jonathan-borba-Z1Oyw2snqn8-unsplash.jpg',
//                description: 'Baby Pink  Hoodie',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Sky Blue Shirt',
//                image: '../marina-abrosimova-r8LmVbUKgns-unsplash.jpg',
//                description: 'Sky Blue Formal Shirt',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Kurta',
//                image: '../muhammad-murtaza-ghani-Jcd1QCImfeE-unsplash.jpg',
//                description: 'White Kurta With Basket',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'T-Shirts with Leggies',
//                image: '../nathan-dumlao-puWkYFKJVbA-unsplash.jpg',
//                description: 'Baby Girl T-Shirts with Leggies',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Round Neck T-Shirt',
//                image: '../priscilla-du-preez-3CTufp-cpzo-unsplash.jpg',
//                description: 'Printed Round Neck T-Shirt',
//                price: '360',
//                catagoryname:"kids"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Round Neck T-Shirt',
//                image: '../tetbirt-salim-4LunKr1gTd8-unsplash.jpg',
//                description: 'Printed Round Neck T-Shirt In Pink Color',
//                price: '360',
//                catagoryname:"kids"
//            },
//            {
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Behaz Ghaffarian',
//                image: '../behzad-ghaffarian-nhWgZNV85LQ-unsplash.jpg',
//                description: 'Designer Behaz Ghaffarian',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            {
//                _id:new mongoose.Types.ObjectId(),
//                title: 'Benjamin Voros',
//                image: '../benjamin-voros-X63FTIZFbZo-unsplash.jpg',
//                description: 'White Color BEnjamin Voros',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Sofas',
//                image: '../di_an_h-g_8MrEZAvyE-unsplash.jpg',
//                description: 'Sofa With Table',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Balck Chair',
//                image: '../eugene-chystiakov-3neSwyntbQ8-unsplash.jpg',
//                description: 'Stylish Black Painted Chai',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Jocelyn Morales',
//                image: '../jocelyn-morales-77yGVQ9RFK8-unsplash.jpg',
//                description: 'Jocelyn Morales For Restaurants',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Tiana Borcherding',
//                image: '../tiana-borcherding-1eVYwkNHqVU-unsplash.jpg',
//                description: 'Tiana Borcherding For Restaurant',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Designer Chair',
//                image: '../toa-heftiba-7JaOPU9FrJA-unsplash.jpg',
//                description: 'Designer Chair For Living Room',
//                price: '360',
//                catagoryname:"furniture"
//            },
//            { _id:new mongoose.Types.ObjectId(),
//                title: 'Toa Heftiba',
//                image: '../toa-heftiba-FV3GConVSss-unsplash.jpg',
//                description: 'Toa Heftiba For Living Rooms And Restaurants',
//                price: '360',
//                catagoryname:"furniture"
//            },
//        ]
//  )