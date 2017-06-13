var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Activity Model
 * ==========
 */

var Activity = new keystone.List('Activity', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Activity.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	company: { type: Types.Relationship, ref: 'Company', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Activity.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Activity.defaultColumns = 'title, state|20%, company|20%, publishedDate|20%';
Activity.register();
