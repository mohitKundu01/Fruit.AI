



from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# MongoDB Client Setup
MONGO_DETAILS = "mongodb+srv://Kundu:Kundu2218@cluster0.pw996.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.faq_db  
faq_collection = db.faqs  

def faq_helper(faq) -> dict:
    return {
        "id": str(faq["_id"]),
        "heading": faq["heading"],  
        
        "question": faq["question"],
        "answer": faq["answer"],
        "image_url": faq.get("image_url")
    }


class FAQ(BaseModel):
    heading: str  
    question: str
    answer: str
    image_url: Optional[str] = None


@app.get("/faqs", response_model=List[dict])
async def get_faqs():
    faqs = []
    async for faq in faq_collection.find():
        faqs.append(faq_helper(faq))
    if not faqs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No FAQs found")
    return faqs


@app.get("/faqs/{faq_id}", response_model=dict)
async def get_faq_by_id(faq_id: str):
    faq = await faq_collection.find_one({"_id": ObjectId(faq_id)})
    if faq is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    return faq_helper(faq)

# POST /faqs - Create a new FAQ
@app.post("/faqs", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_faq(faq: FAQ):
    new_faq = await faq_collection.insert_one(faq.dict())
    created_faq = await faq_collection.find_one({"_id": new_faq.inserted_id})
    return faq_helper(created_faq)

# PUT /faqs/{faq_id} - Update a FAQ by ID
@app.put("/faqs/{faq_id}", response_model=dict)
async def update_faq(faq_id: str, updated_faq: FAQ):
    update_result = await faq_collection.update_one(
        {"_id": ObjectId(faq_id)}, {"$set": updated_faq.dict()}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    updated_faq = await faq_collection.find_one({"_id": ObjectId(faq_id)})
    return faq_helper(updated_faq)

# DELETE /faqs/{faq_id} - Delete a FAQ by ID
@app.delete("/faqs/{faq_id}", response_model=dict)
async def delete_faq(faq_id: str):
    delete_result = await faq_collection.delete_one({"_id": ObjectId(faq_id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    return {"message": "FAQ deleted successfully"}
