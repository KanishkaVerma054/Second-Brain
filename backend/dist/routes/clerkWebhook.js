"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkWebhookRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const svix_1 = require("svix");
exports.clerkWebhookRouter = (0, express_1.Router)();
exports.clerkWebhookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config_1.SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env');
    }
    // Create new Svix instance with secret
    const wh = new svix_1.Webhook(config_1.SIGNING_SECRET);
    // Get headers and body
    const headers = req.headers;
    const payload = req.body;
    // Get Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return void res.status(400).json({
            success: false,
            message: 'Error: Missing svix headers',
        });
    }
    let evt;
    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
        evt = wh.verify(JSON.stringify(payload), {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    }
    catch (error) {
        console.log('Error: Could not verify webhook:', error instanceof Error ? error.message : String(error));
        return void res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : String(error)
        });
    }
    // Do something with payload
    // For this guide, log payload to console
    // const { id } = evt.data
    // const eventType = evt.type
    // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)
    if (evt.type === 'user.created') {
        console.log('userId:', evt.data.id);
    }
    return void res.status(200).json({
        success: true,
        message: 'Webhook received',
    });
}));
