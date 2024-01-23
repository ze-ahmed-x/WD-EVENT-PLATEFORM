"use server"

import { CreateCategoryParams } from "@/types"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model";
import { handleError } from "../utils";
import { NextResponse } from "next/server";

export async function createCategory({categoryName}:CreateCategoryParams ){
    try {
        await connectToDatabase();
        const category =  await Category.create({name: categoryName});
        if (!category) throw new Error('Category creation failed');
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        handleError(error);
    }
}

export async function getAllCategories(){
    try {
        await connectToDatabase();
        const categories =  await Category.find();
        if (!categories) throw new Error('Category creation failed');
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error);
    }
}