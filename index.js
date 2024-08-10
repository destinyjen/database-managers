// Import required modules (inquier for user prompts, pg for PostgreSQL database interaction, dotenv for loading environment variables)
const inquirer = require("inquirer");
const { Pool } = require('pg');
require("dotenv").config(); 