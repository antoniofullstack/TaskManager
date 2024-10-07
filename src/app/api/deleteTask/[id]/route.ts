import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        const id = context.params.id;
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}