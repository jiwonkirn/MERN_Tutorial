const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    tpye: String,
    require: true,
    max: 40
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    tpye: String,
    require: true
  },
  skills: {
    type: [String],
    require: true
  },
  bio: {
    tpye: String
  },
  githubUsername: {
    tpye: String
  },
  experience: [
    {
      title: {
        type: String,
        require: true
      },
      company: {
        tpye: String,
        require: true
      },
      location: {
        type: String
      },
      from: {
        tpye: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        tpye: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        require: true
      },
      degree: {
        tpye: String,
        require: true
      },
      fieldodstudy: {
        type: String,
        require: true
      },
      from: {
        tpye: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        tpye: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
