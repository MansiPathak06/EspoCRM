import React, { useState, useRef } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  X, 
  MoreHorizontal, 
  Paperclip, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table, 
  Link, 
  Image, 
  Code, 
  MoreVertical, 
  Info 
} from 'lucide-react';

const KnowledgeBase = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    language: 'Any',
    categories: '',
    portals: '',
    body: '',
    attachments: []
  });

  const statusOptions = ['Draft', 'Published', 'Archived'];
  const languageOptions = ['Any', 'English', 'Spanish', 'French', 'German', 'Italian'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      const newArticle = {
        id: Date.now(),
        ...formData,
        createdDate: new Date().toISOString()
      };
      setArticles(prev => [newArticle, ...prev]);
      setFormData({
        name: '',
        status: 'Draft',
        language: 'Any',
        categories: '',
        portals: '',
        body: '',
        attachments: []
      });
      setShowCreateModal(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      status: 'Draft',
      language: 'Any',
      categories: '',
      portals: '',
      body: '',
      attachments: []
    });
    setShowCreateModal(false);
  };

  const DropdownField = ({ value, options, onChange, placeholder = "Select" }) => (
    <div className="relative">
      <select 
        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );

  const SelectField = ({ value, onChange, placeholder = "Select" }) => (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex items-center px-2 space-x-1">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );

  const RichTextEditor = () => {
    const editorRef = useRef(null);
    const [fontSize, setFontSize] = useState('14');
    const [alignment, setAlignment] = useState('left');

    const execCommand = (command, value = null) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
    };

    const insertText = (text) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    const handleContentChange = () => {
      if (editorRef.current) {
        const content = editorRef.current.innerHTML;
        handleInputChange('body', content);
      }
    };

    const handleFontSizeChange = (size) => {
      setFontSize(size);
      execCommand('fontSize', size);
    };

    const handleAlignmentChange = (align) => {
      setAlignment(align);
      const alignCommand = align === 'left' ? 'justifyLeft' : 
                          align === 'center' ? 'justifyCenter' : 'justifyRight';
      execCommand(alignCommand);
    };

    const insertTable = () => {
      const tableHTML = `
        <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Cell 1</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Cell 2</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Cell 3</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Cell 4</td>
          </tr>
        </table>
      `;
      document.execCommand('insertHTML', false, tableHTML);
    };

    const insertLink = () => {
      const url = prompt('Enter URL:');
      if (url) {
        execCommand('createLink', url);
      }
    };

    return (
      <div className="border border-gray-300 rounded-md">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-2 flex flex-wrap items-center gap-1 bg-gray-50 rounded-t-md">
          {/* Format Block */}
          <select 
            className="px-2 py-1 text-sm border border-gray-300 rounded appearance-none bg-white pr-6"
            onChange={(e) => execCommand('formatBlock', e.target.value)}
          >
            <option value="">Normal</option>
            <option value="<h1>">Heading 1</option>
            <option value="<h2>">Heading 2</option>
            <option value="<h3>">Heading 3</option>
            <option value="<p>">Paragraph</option>
          </select>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Formatting Buttons */}
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('bold')}
          >
            <Bold className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('italic')}
          >
            <Italic className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('underline')}
          >
            <Underline className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('strikeThrough')}
          >
            <Strikethrough className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Font Size */}
          <select 
            className="px-2 py-1 text-sm border border-gray-300 rounded appearance-none bg-white pr-6"
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
          >
            <option value="1">10</option>
            <option value="2">13</option>
            <option value="3">16</option>
            <option value="4">18</option>
            <option value="5">24</option>
            <option value="6">32</option>
            <option value="7">48</option>
          </select>
          
          {/* Text Color */}
          <input 
            type="color" 
            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
            onChange={(e) => execCommand('foreColor', e.target.value)}
            title="Text Color"
          />
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Lists */}
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('insertUnorderedList')}
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('insertOrderedList')}
          >
            <ListOrdered className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Alignment */}
          <button 
            className={`p-1 hover:bg-gray-200 rounded ${alignment === 'left' ? 'bg-gray-200' : ''}`}
            onClick={() => handleAlignmentChange('left')}
          >
            <AlignLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className={`p-1 hover:bg-gray-200 rounded ${alignment === 'center' ? 'bg-gray-200' : ''}`}
            onClick={() => handleAlignmentChange('center')}
          >
            <AlignCenter className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className={`p-1 hover:bg-gray-200 rounded ${alignment === 'right' ? 'bg-gray-200' : ''}`}
            onClick={() => handleAlignmentChange('right')}
          >
            <AlignRight className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Insert Elements */}
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={insertTable}
          >
            <Table className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={insertLink}
          >
            <Link className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('insertImage', prompt('Enter image URL:'))}
          >
            <Image className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Undo/Redo */}
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('undo')}
          >
            <span className="w-4 h-4 text-gray-600 text-sm">↶</span>
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('redo')}
          >
            <span className="w-4 h-4 text-gray-600 text-sm">↷</span>
          </button>
          
          {/* Clear Formatting */}
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => execCommand('removeFormat')}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Editable Content Area */}
        <div
          ref={editorRef}
          contentEditable
          className="w-full min-h-32 p-3 focus:outline-none border-none"
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: formData.body }}
          style={{
            minHeight: '128px',
            maxHeight: '300px',
            overflowY: 'auto'
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Knowledge Base</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=""
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center text-gray-500">
              <p className="text-lg">No Data</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {article.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          article.status === 'Published' ? 'bg-green-100 text-green-800' :
                          article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.language}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.categories}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.createdDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Article Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCancel}></div>
            <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Create Article</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Minus className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Modal Actions */}
              <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Full Form
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  {/* Status and Language Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <DropdownField
                        value={formData.status}
                        options={statusOptions}
                        onChange={(value) => handleInputChange('status', value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <DropdownField
                        value={formData.language}
                        options={languageOptions}
                        onChange={(value) => handleInputChange('language', value)}
                      />
                    </div>
                  </div>

                  {/* Categories and Portals Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                      <SelectField
                        value={formData.categories}
                        onChange={(value) => handleInputChange('categories', value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        Portals <Info className="w-4 h-4 text-gray-400 ml-1" />
                      </label>
                      <SelectField
                        value={formData.portals}
                        onChange={(value) => handleInputChange('portals', value)}
                      />
                    </div>
                  </div>

                  {/* Body Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                    <RichTextEditor />
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {articles.length === 0 ? '0 / 0' : `1 / ${articles.length}`}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={articles.length === 0}>
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={articles.length === 0}>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;