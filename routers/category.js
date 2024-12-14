
import express from "express";
const router = express.Router()
import Category from '../models/Category.js'
import Joi from "joi";

function slugify(str) {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

router.post("/", async (req, res) => {
    try {
        const categorySchema = Joi.object({
            title: Joi.string().min(3).max(40).required()
        })
        const { error, value } = categorySchema.validate(req.body)
        if (error) return res.status(400).json({ msg: error.message, error: true })

        const category = { title: value.title, slug: slugify(value.title) }

        let newCategory = new Category(category)
        newCategory = await newCategory.save()
        res.status(201).json({
            msg: 'Category Added Successfully', error: false,
            data: newCategory
        })
    }
    catch (err) {
        res.status(500).json({ msg: err.message, error: true })
    }

})

router.get('/', async (req, res) => {
    const categories = await Category.find()
    res.status(200).json({
        msg: 'Category Fetched Successfully', error: false,
        data: categories
    })
})

router.delete('/',async (req, res) => {
    try {
        const {id } = req.body;
    const deleteItem = await Category.deleteOne({_id:id})
    console.log('delete successfully');
    return res.status(200).json({msg:"Delete successfully" ,error:false})
    
    } catch (error) {
        console.log('error',error);
    return res.status(500).json({msg:error.message ,error:true})

        
    }
})

router.put('/',async (req,res)=>{
try {
    const {id ,updatedText } = req.body;
    const item = await Category.findByIdAndUpdate(id,{
        title:updatedText,
        slug:slugify(updatedText)
    })
    console.log('item', item);
    return res.status(201).json({msg:"Updated  successfully" ,error:false })
    
} catch (error) {
    console.log('error',error);

    return res.status(500).json({msg:error.message ,error:true})
}
})

// router.get('/:slug', (req, res) => {
//     const category = categories.find((data) => data.slug == req.params.slug)
//     if (!category) return res.status(404).json({
//         error: true,
//         data: null,
//         msg: 'Category not found.'
//     })
//     res.status(200).json({
//         error: false,
//         data: category,
//         msg: 'Category found Successfully'
//     })
// })

export default router