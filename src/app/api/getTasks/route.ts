import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET() {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data })
}