// src/app/api/page-map/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  try {
    const pageMapPath = path.join(process.cwd(), 'src', 'pageMap.json');
    
    // Check if pageMap.json exists
    if (!fs.existsSync(pageMapPath)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'pageMap.json not found',
          data: [] 
        },
        { status: 404 }
      );
    }
    
    // Read and parse pageMap.json
    const pageMapData = fs.readFileSync(pageMapPath, 'utf8');
    const pageMap = JSON.parse(pageMapData);
    
    return NextResponse.json({
      success: true,
      data: pageMap
    });
    
  } catch (error) {
    console.error('Error loading pageMap:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load pageMap',
        data: []
      },
      { status: 500 }
    );
  }
}
