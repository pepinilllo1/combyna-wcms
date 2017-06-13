																																																																																																																																																																																																																																																																																																																																																																																																																																																																				var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Company = new keystone.List('Company');

Company.add({
	name: { type: Types.Name, required: true, index: true },
	logo: { type: Types.CloudinaryImage },
	website: Types.Url,
	description: { type: Types.Markdown },
	location: Types.Location,
	email: { type: Types.Email },
	phone: { type: Types.Number }
});

/**
 * Relationships
 */
Company.relationship({ ref: 'Activity', path: 'activities', refPath: 'company' });


/**
 * Registration
 */
Company.defaultColumns = 'name, website, email, phone';
Company.register();
