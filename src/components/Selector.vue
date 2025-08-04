<template>
    <div class="text-center upload-container p-5">
        <!-- Circle Upload Component -->
        <div class="circle-upload mx-auto" :class="{ 'drag-over': isDragOver }" @click="triggerFileInput"
            @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
            <div class="text-center">
                <i class="fas fa-cloud-upload-alt upload-icon pulse-glow"></i>
                <div class="upload-text mt-2 fw-bold p-3">
                    {{ $t("upload.circle") }}
                </div>
            </div>
        </div>

        <!-- Hidden file input -->
        <input type="file" class="hidden-input" multiple @change="handleFileSelect" ref="fileInput" accept="*/*">

        <div class="form-text mt-5">
            <i class="fas fa-mouse-pointer me-1"></i>
            {{ $t("upload.text") }}
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
export default {

}
</script>

<style>
:root {
    --upload-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    --upload-hover-bg: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
    --upload-drag-bg: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    --upload-border: linear-gradient(135deg, #667eea 0%, #764ba2 100%);;
    --upload-hover-border: #0056b3;
    --upload-drag-border: #28a745;
    --upload-icon: #007bff;
    --upload-icon-hover: #0056b3;
    --upload-icon-drag: #28a745;
}

.dark {
    --upload-bg: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    --upload-hover-bg: linear-gradient(135deg, #2e3b4e 0%, #1c2838 100%);
    --upload-drag-bg: linear-gradient(135deg, #1f3f2e 0%, #173822 100%);
    --upload-border: #a8edea;
    --upload-hover-border: #fed6e3;
    --upload-drag-border: #68d391;
    --upload-icon: #a8edea;
    --upload-icon-hover: #fed6e3;
    --upload-icon-drag: #68d391;
}

.upload-container {
    z-index: 2;
    position: relative;
}

.circle-upload {
    width: 200px;
    height: 200px;
    border: 2px dashed var(--upload-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--upload-bg);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

.circle-upload:hover {
    border-color: var(--upload-hover-border);
    background: var(--upload-hover-bg);
    transform: scale(1.05);
}

.circle-upload.drag-over {
    border-color: var(--upload-drag-border);
    background: var(--upload-drag-bg);
    transform: scale(1.1);
}

.upload-icon {
    font-size: 3rem;
    color: var(--upload-icon);
    transition: all 0.3s ease;
}

.circle-upload:hover .upload-icon {
    color: var(--upload-icon-hover);
    transform: scale(1.1);
}

.circle-upload.drag-over .upload-icon {
    color: var(--upload-icon-drag);
}

.hidden-input {
    display: none;
}

.form-text {
    font-size: 0.85rem;
    color: #6c757d;
}

.dark .form-text, .dark .upload-text {
    color: #ced4da !important;
}

</style>