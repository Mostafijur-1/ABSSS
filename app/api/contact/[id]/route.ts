import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Contact from '@/lib/models/Contact';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'contacts');
    await connectDB();
    const id = params.id;
    const body = await request.json();
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    
    if (!updatedContact) {
      return NextResponse.json({ message: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating message status:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to update message status' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'contacts');
    await connectDB();
    const id = params.id;
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({ message: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
