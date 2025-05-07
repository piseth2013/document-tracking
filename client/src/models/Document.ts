import mongoose from 'mongoose';

const documentVersionSchema = new mongoose.Schema({
  versionNumber: { type: Number, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    id: String,
    name: String,
    email: String,
    avatar: String
  },
  changeDescription: String
});

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    id: String,
    name: String,
    email: String,
    avatar: String
  },
  folderId: { type: String, default: null },
  tags: [String],
  starred: { type: Boolean, default: false },
  versions: [documentVersionSchema],
  fileType: { type: String, required: true }
});

export const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);